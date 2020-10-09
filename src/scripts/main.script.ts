require("lib/typescript");

// Properties
interface Props {
    excitement: number;
}
go.property("excitement", 100);

// Init (implicit self)
function init(): void {
    print("Welcome to defold-typescript; A dev environment for Defold that transpiles TypeScript into lua using typescript-to-lua.");
    print("");

    print("This 🗝 turnkey Defold TypeScript dev environment features:");
    msg.post("#", "features");
}

// Init (explicit self, typed)
function on_message(this: Props, message_id: hash, message: string, sender: any): void {
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
        print("System:", sys.get_sys_info().system_name);
        print("Collected Garbage Size:", collectgarbage("count") * 1024);
        print(`We ❤ TypeScript and are ${this.excitement}% excited for TypeScript in Defold!`);
    }
}
