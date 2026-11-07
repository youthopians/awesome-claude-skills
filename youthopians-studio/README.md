# Youthopians Studio

A project management desk for Youthopians Advertising PLC, built around how a communication and media production company actually works: production phases, a 5-step delivery check, and a 5-step assumptions register. It runs as a desktop app on **macOS** and **Windows**, and the same file runs in any browser.

## What's inside

| Area | What it does |
|---|---|
| **Home** | Overdue tasks, work due in 7 days, deliverables in QC, open assumptions, project health, activity feed |
| **My tasks** | Everything assigned to the person in "Working as", grouped Overdue / Today / Next 7 days / Later |
| **Projects** | Overview, List (by production phase), Board (drag-and-drop), Timeline (Gantt), Calendar, Delivery checks, Assumptions |
| **Calendar** | All task due dates and deliverables across projects, by month |
| **Delivery checks** | The 5-step quality gate for every deliverable |
| **Assumptions** | The 5-step assumptions register with risk scoring |
| **Team** | Workload per person (open, due in 7 days, late, in QC) |

Tasks have an assignee, status, phase, priority, start and due dates, notes, subtasks and comments. Use search (`/`), quick-add a task (`N`), switch between light and dark themes, and export or import the whole workspace as JSON.

### Production phases
Every project follows the same seven phases: **Inception → Pre-production → Production → Post-production → Language & access → Client review → Delivery**. New projects can be created from a template for each project type (Documentary, Commercial, Photography, Design & Print, Social & Digital, Event coverage). Each template sets up the phase tasks with due dates spread across the schedule.

### The 5-step delivery check
A deliverable can't be recorded as delivered until it passes all five steps **in order**. Each step needs every item ticked and a named sign-off.

1. **Brief & scope match**: matches the approved brief, quantities, versions and languages.
2. **Technical QC**: picture, sound levels (-14 LUFS web / -23 LUFS broadcast), resolution, codec, subtitles, file naming.
3. **Editorial & factual**: names, dates, claims, translations, brand guidelines.
4. **Ethics, consent & rights**: consent and releases, dignity-first review, safeguarding, licences, AI disclosure.
5. **Approval & handover**: internal sign-off, written client approval, 3-2-1 backup, delivery, client confirmation of receipt.

**Return for fixes** at any step resets the check from that step onward, logs the reason, and creates a high-priority fix task for the deliverable owner.

### The 5-step assumption check
1. **State it**: one testable "We assume…" sentence.
2. **Evidence**: the source, plus confidence (Verified / To confirm / Unsupported).
3. **Impact if wrong**: what breaks, with impact × likelihood (1–25) as the risk score.
4. **Validate**: owner, method and validate-by date. Overdue validations are flagged.
5. **Decide & log**: Confirmed, Rejected (this creates a change-request task), or Converted to risk.

New projects created from a template start with five standard assumptions: client brief, revision rounds, location access, talent availability, and music licensing. A project's **Close-out readiness** panel blocks closing while any deliverable or assumption is still open.

## Run it

**Quick preview (no install):** open `app/index.html` in Chrome, Edge or Safari.

**Desktop app (Mac and Windows):** you need [Node.js 18+](https://nodejs.org).

```bash
cd youthopians-studio
npm install
npm start            # run the app
npm run dist:mac     # build Mac .zip apps (works on Mac or Linux)
npm run dist:win     # build a Windows installer .exe (run on Windows)
```

Installers are written to `release/`. Build the macOS installer on a Mac and the Windows installer on Windows (or use CI runners for each). Unsigned builds will show a Gatekeeper or SmartScreen warning the first time. Add an Apple Developer ID or a Windows code-signing certificate to remove it.

### Installing on a Mac
1. Download the zip from the latest **Youthopians Studio** release on GitHub: **arm64** for Apple Silicon (M1–M4), **x64** for Intel.
2. Double-click the zip and drag **Youthopians Studio** into **Applications**.
3. The app is not signed by Apple, so run this once in Terminal:
   ```
   xattr -cr "/Applications/Youthopians Studio.app"
   codesign --force --deep --sign - "/Applications/Youthopians Studio.app"
   open "/Applications/Youthopians Studio.app"
   ```

## Data

- Data is stored locally on each computer:
  - macOS: `~/Library/Application Support/Youthopians Studio`
  - Windows: `%APPDATA%\Youthopians Studio`
- Use **Export** to save a `.json` backup and **Import** to load one onto another machine.
- The app opens with clearly marked **sample projects**. Choose **Reset → Start empty** to clear them and keep your team list.
- Team members start as role placeholders (Head of Creative, Head of Production, Office Admin, Producer, Editor, Designer). Rename them on the **Team** page.

### Next step: shared team sync
This version is single-user per machine. To let the whole team see the same projects live, the next step is a small shared backend: for example, a hosted database such as Supabase or Firebase, or a SharePoint list via Microsoft Graph. The state is one JSON object, so the storage layer can be swapped out without changing the UI.
