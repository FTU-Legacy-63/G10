import Phaser from 'phaser';
import { ROOM_ART, ROOM_COPY, ROOM_OBJECTS, ROOM_SIZE, roomTextureKey } from './roomArt';
import { boardPaperRect, roomFrame } from './roomState';
import type { RoomPresentation } from './roomState';

/** Rendering only. Every pointer and keyboard action belongs to the semantic HTML layer. */
export class OfficeScene extends Phaser.Scene {
  private room?: Phaser.GameObjects.Container;
  private direction = 0;
  private motion?: Phaser.Tweens.Tween;
  private sprites = new Map<string, Phaser.GameObjects.Image>();
  private boardCards?: Phaser.GameObjects.Graphics;
  private oldStates = new Map<string, string>();
  private sampleStart = 0;
  private sampledFrames = 0;
  constructor() { super('office'); }
  preload() {
    ROOM_ART.forEach((url, i) => this.load.svg(`room-v2:wall:${i}`, url, ROOM_SIZE));
    [...ROOM_OBJECTS, ROOM_COPY].forEach(object => Object.entries(object.states).forEach(([state, url]) => this.load.svg(roomTextureKey(object.id, state), url, { width: object.width, height: object.height })));
    this.load.on('loaderror', () => this.game.events.emit('office-error'));
  }
  create() {
    this.sampleStart = performance.now(); this.sampledFrames = 0;
    this.direction = Number(this.registry.get('direction') ?? 0);
    this.showWall(true);
    this.registry.events.on('changedata-direction', this.changeDirection, this);
    this.registry.events.on('changedata-activeView', this.changeFocus, this);
    this.registry.events.on('changedata-roomState', this.syncObjects, this);
    this.scale.on('resize', this.resizeRoom, this);
    this.game.events.emit('office-ready');
    this.events.once('shutdown', () => {
      this.registry.events.off('changedata-direction', this.changeDirection, this);
      this.registry.events.off('changedata-activeView', this.changeFocus, this);
      this.registry.events.off('changedata-roomState', this.syncObjects, this);
      this.scale.off('resize', this.resizeRoom, this);
    });
  }
  update() {
    if (this.sampledFrames >= 90) return;
    this.sampledFrames++;
    if (this.sampledFrames === 90) {
      const elapsed = performance.now() - this.sampleStart;
      // Non-visual diagnostics; no gameplay time, progression or scoring depends on this.
      this.game.canvas.dataset.sampleFps = (90000 / elapsed).toFixed(1);
      this.game.canvas.dataset.sampleFrames = '90';
      this.game.canvas.dataset.renderer = 'Phaser Canvas';
    }
  }
  private changeDirection(_parent: unknown, value: number) { this.direction = value; this.showWall(false); }
  private changeFocus() { this.fit(true); this.syncObjects(); }
  private resizeRoom() { this.fit(false); }
  private showWall(immediate: boolean) {
    this.tweens.killAll(); this.motion = undefined;
    this.room?.destroy(true); this.sprites.clear(); this.oldStates.clear();
    this.room = this.add.container();
    this.room.add(this.add.image(0, 0, `room-v2:wall:${this.direction}`).setOrigin(0));
    for (const object of ROOM_OBJECTS.filter(object => object.direction === this.direction)) {
      const state = Object.keys(object.states)[0];
      const sprite = this.add.image(object.x, object.y, roomTextureKey(object.id, state)).setOrigin(0);
      this.sprites.set(object.id, sprite); this.room.add(sprite);
    }
    if (this.direction === 2) { this.boardCards = this.add.graphics(); this.room.add(this.boardCards); }
    else this.boardCards = undefined;
    if (this.direction === 0) {
      const copy = this.add.image(ROOM_COPY.x, ROOM_COPY.y, roomTextureKey('copy', 'placed')).setOrigin(0);
      this.sprites.set('copy', copy); this.room.add(copy);
    }
    this.syncObjects(); this.fit(false);
    if (!immediate && !this.registry.get('reducedMotion')) {
      this.room.setAlpha(.25);
      this.tweens.add({ targets: this.room, alpha: 1, duration: 180, ease: 'Sine.easeOut' });
    }
  }
  private syncObjects() {
    const model = this.registry.get('roomState') as RoomPresentation | undefined;
    if (!model) return;
    for (const object of ROOM_OBJECTS) {
      const sprite = this.sprites.get(object.id); if (!sprite) continue;
      const state = model.states[object.id];
      if (state && object.states[state]) {
        sprite.setTexture(roomTextureKey(object.id, object.id === 'board' ? 'empty' : state));
        const previous = this.oldStates.get(object.id);
        if (previous && previous !== state && !this.registry.get('reducedMotion')) {
          this.tweens.killTweensOf(sprite);
          sprite.setY(object.y + 7);
          this.tweens.add({ targets: sprite, y: object.y, duration: 160, ease: 'Sine.easeOut' });
        }
        this.oldStates.set(object.id, state);
      }
    }
    this.sprites.get('copy')?.setVisible(!!model.deskCopy);
    if (this.boardCards) {
      this.boardCards.clear();
      model.boardSources.forEach((source, i) => {
        const { x, y } = boardPaperRect(source, i, model.boardLayout);
        this.boardCards!.fillStyle(0xf6f0dd).lineStyle(3, 0x303a35).fillRect(x, y, 340, 270).strokeRect(x, y, 340, 270);
        this.boardCards!.fillStyle(0xaf7560).fillCircle(x + 170, y + 5, 7);
      });
    }
  }
  private fit(animate: boolean) {
    if (!this.room) return;
    this.motion?.stop();
    const { width, height } = this.scale;
    const pose = roomFrame(width, height, this.direction, this.registry.get('activeView') !== 'office');
    if (animate && !this.registry.get('reducedMotion')) this.motion = this.tweens.add({ targets: this.room, x: pose.x, y: pose.y, scaleX: pose.scale, scaleY: pose.scale, duration: 260, ease: 'Cubic.easeOut' });
    else this.room.setPosition(pose.x, pose.y).setScale(pose.scale);
  }
}
