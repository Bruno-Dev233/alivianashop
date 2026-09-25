<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Assets

- Small locally prepared images (logos, icons) are imported directly as ES6 imports from `src/assets/` (e.g. `import logo from "@/assets/aliviana-logo.png"`). `tsconfig.json` already sets `types: ["vite/client"]`, so the import resolves and Vite bundles the file — no `.asset.json` pointer or storage bucket needed, and the private `landing-images` bucket cannot serve customers anyway.
- When a logo arrives as a JPG with a baked-in transparency checkerboard, strip it in code (threshold the darkness channel, save as `LA` PNG) instead of routing it through the image provider, which rejects brand wordmarks.
