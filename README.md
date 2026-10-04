# The Quiz Bar

A cosy multiplayer quiz for two people, or a small group of up to eight.
Choose a character, create a table, and invite your favourite rival.
The host plays too. There is no separate quizmaster device.

## Put it on GitHub Pages — no installation or build needed

1. Unzip `quiz-bar.zip` on your computer.
2. Create a GitHub repository (for example `quiz-bar`). A public repository works with GitHub Free.
3. Use **Add file → Upload files**. Upload the CONTENTS of the extracted `quiz-bar` folder, including the `vendor` folder. `index.html` must be at the top level of the repository, not inside a second `quiz-bar` folder.
4. Commit the uploaded files.
5. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Select **main** and **/(root)**, then **Save**.
6. When GitHub finishes publishing, open the address shown in Settings → Pages. It will normally look like `https://YOUR-USERNAME.github.io/quiz-bar/`.
7. Open that same website on both devices.

GitHub's instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Play together

- One of you chooses **Create a table**, enters a nickname and selects an animal character.
- Pick a name for the night and a time limit (20, 30, 45 or 60 seconds).
- Click the room code to copy an invite link, or send the six-character code.
- The other player opens the link, picks a nickname and character, and joins.
- The host clicks **Let's play**. At least two players must join before starting.
- You both answer on your own screens. Your first answer locks immediately.
- Answers reveal automatically after everyone answers, or when time expires.
- Each correct answer is worth 100 points. There is no speed bonus.
- The host advances after each reveal. After 15 questions, see the results or start a rematch.
- You can choose the same character as another player; nicknames must be unique.

## What's included

- Ten animal characters: fox, frog, panda, cat, octopus, owl, bear, rabbit, lion and hedgehog.
- Three rounds of five questions: The warm-up, Screen & sound, and The final call.
- A 45-question bank. Each match samples five questions from each category and shuffles answer order.
- Rematches prefer questions not yet used in the current room; after the bank is exhausted questions can repeat.
- Shared room state, countdown, answer locking, scores, tie handling and mobile layouts.
- No accounts, API keys, database or build step required for the default setup.

## How the online connection works

GitHub Pages serves the static website. PeerJS 1.5.4 and its public signaling service connect the players using browser WebRTC data channels. The host's browser holds the live game state and sends updates to the guests. The PeerJS client is bundled in `vendor`; no package installation is required.

This is a casual friends-and-family game, not an always-on server:

- Everyone needs internet access. The PeerJS signaling service must be available.
- Keep the host tab open and the host device awake. Closing or refreshing it ends the room. A new room can be created whenever you want.
- Guests who disconnect during a quiz cannot resume their score in this version. Start a fresh room if needed, or join when the host returns to the lobby for a rematch.
- Room state and scores are temporary. They are not stored after the session ends.
- Corporate networks, VPNs and some mobile/NAT configurations can block WebRTC. Try another Wi-Fi network or hotspot. Guaranteed connectivity across those networks requires a TURN relay; optional connection settings live in `config.js`.
- Room codes are invitations, not password-protected authentication. Send them only to the people you want to play with.
- The question bank and answer keys are visible in the published JavaScript. This is intended for honest play with friends, not cheat-proof competitions.
- Emoji appearance varies by device. Google Fonts is optional: built-in font fallbacks work if it is blocked.

PeerJS docs: https://peerjs.com/client/getting-started
Connection limitations: https://peerjs.com/client/faq

## Change or add questions

Edit `questions.js`. Each question has this format:

```js
{
  round: 'The warm-up', // Keep one of the three existing round names
  category: 'Geography',
  q: 'What is the capital of Cyprus?',
  o: ['Limassol', 'Larnaca', 'Nicosia', 'Paphos'],
  a: 2, // Zero-based answer index: 0, 1, 2 or 3
  f: 'Nicosia is the capital of Cyprus.'
}
```

Keep at least five questions in each round. Update the visible question-bank count in `app.js` if you add questions.

## Files

- `index.html` — entry page
- `style.css` — styling and responsive layouts
- `app.js` — screens and multiplayer transport
- `engine.js` — game rules and character list
- `questions.js` — editable question bank
- `config.js` — optional PeerJS settings
- `vendor/` — bundled PeerJS client and its MIT license
- `tests/engine.test.js` — game-rule tests
- `package.json` — optional test command; no runtime dependencies to install

## Test locally

Serve the folder over HTTP instead of double-clicking index.html:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000` in two tabs. For real friends on different devices, use the GitHub Pages HTTPS address.

If Node.js is installed, run the rule tests with:

```sh
npm test
```

Validation performed: JavaScript syntax checks and automated game-engine tests covering host/guest scoring, automatic reveal, duplicate and late answers, hidden answer keys in live snapshots, full 15-question games and rematches. An actual two-device internet connection was not verified in the creation environment; test one room after publishing before inviting a larger group.
