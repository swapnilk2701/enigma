## Packages
framer-motion | Page transitions, futuristic staggers, and hover animations
recharts | Required for the Opportunity Radar data visualization
uuid | To generate unique persistent session IDs for tracking user progress

## Notes
- Tailwind Config: The app heavily relies on dark mode and custom CSS variables for the futuristic neon theme.
- CSS overrides have been added to index.css to map standard Shadcn variables to a cyberpunk/neon palette.
- App requires `uuid` to generate `sessionId` which is stored in `localStorage` to identify the user across AI chats and quiz results.
