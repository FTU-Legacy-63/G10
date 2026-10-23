# Disposable pilot QA tools

These fixtures and fault switches run only with the Vite development server on **127.0.0.1:5181**. Vite rejects `/qa/` on other ports and does not inject the fault script into production builds. They are not game features.

Open `/qa/pilot-tools.html` to prepare an isolated empty/unstarted/complete/corrupt/mismatched fixture, back up or restore the disposable save, simulate an external revision, inspect raw working, and toggle image/canvas/report loading failure. The injected QA toolbar can deny writes only to the pilot key. Report/image/canvas switches take effect on reload. Turn all switches off before finishing. No `localStorage.clear()` is used. The two namespace sentinels are synthetic strings on 5181, not the user's saves.

The user preview is **5180/integration/**. Existing user origins **5173** and **5175** were not used for destructive checks.
