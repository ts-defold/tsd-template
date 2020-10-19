// Properties
interface props {
    excitement: number,
    doOnce: boolean
}
go.property("excitement", 100);

export function init(this: props): void {
    print("Welcome to defold-typescript; A dev environment for Defold that transpiles TypeScript into lua using typescript-to-lua.");
    print("");

    print("Turnkey Defold TypeScript dev environment features:");
    this.doOnce = true;
}

export function update(this: props, _dt: number): void {
    if (this.doOnce) {
        msg.post("#", "features");
        this.doOnce  = false;
    }
}

export function on_message(this: props, message_id: hash, _message: string, _sender: url): void {
    if (message_id == hash("features")) {
        const features: Array<string> = [
            "  ⭐ .vscode folder based project",
            "  ⭐ lua-types and defold-types for autocomplete and inline docs",
            "  ⭐ eslint with sane typescript defaults",
            "  ⭐ patched typescript-to-lua to generate *.script files"
        ];
        for (let i = 0; i < features.length; ++i) {
            print(features[i]);
        }
        
        print("To get started simply use `npm run` and get going!");
        msg.post("#", "usage");
    }
    else if (message_id == hash("usage")) {
        print("  ✔ Use `npm run dev` to start a watcher that compiles and emits lua and script when you save");
        print("  ✔ Use `npm run build` to just compile your ts, sans watcher ");

        print("⌚ Stats!");
        msg.post("#", "stats");
    }
    else if (message_id == hash("stats")) {
        print("Collected Garbage Size:", collectgarbage("count") * 1024);
        print(`We ❤ TypeScript and are ${this.excitement}% excited for TypeScript in Defold!`);
    }
}
