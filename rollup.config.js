import typescript from "@wessberg/rollup-plugin-ts";
import buble from "@rollup/plugin-buble";
import resolve from "@rollup/plugin-node-resolve";
import { minify as terserMinify } from "terser";
import pkg from "./package.json";

const name = "BIGBITMASK";
const sourceMap = true;
const extensions = [".ts"];
const bubleOptions = { transforms: { dangerousForOf: true } };
const terserOptions = { mangle: { module: true }, sourceMap: sourceMap };
const typescriptDeclarationsOptions = {
    hook: { outputPath: (_, kind) => kind === "declaration" ? "dist/big-bit-mask.d.ts" : (kind === "declarationMap" && "dist/big-bit-mask.d.ts.map") },
    tsconfig: resolvedConfig => ({ ...resolvedConfig, declaration: true, declarationMap: true }),
};
const input = "src/index.ts";

const config = [
    {
        input: input,
        output: [
            {
                file: pkg.browser,
                format: "umd",
                name: name,
                sourcemap: sourceMap,
            },
            {
                file: pkg.browser.replace(/\.(m?js)$/, ".min.$1"),
                format: "umd",
                name: name,
                plugins: [
                    terser(terserOptions),
                ],
                sourcemap: sourceMap,
            },
        ],
        plugins: [
            resolve({ extensions }),
            typescript(),
            buble(bubleOptions),
        ],
    },
    {
        input: input,
        output: [
            {
                file: pkg.module,
                format: "esm",
                sourcemap: sourceMap,
            },
            {
                file: pkg.module.replace(/\.(m?js)$/, ".min.$1"),
                format: "esm",
                plugins: [
                    terser(terserOptions),
                ],
                sourcemap: sourceMap,
            },
        ],
        plugins: [
            resolve({ extensions }),
            typescript(),
        ],
    },
    {
        input: input,
        output: {
            file: pkg.main,
            format: "cjs",
            sourcemap: sourceMap,
        },
        plugins: [
            resolve({ extensions }),
            typescript(typescriptDeclarationsOptions),
        ],
    },
    {
        input: input,
        output: {
            file: pkg.main.replace(/\.(m?js)$/, ".min.$1"),
            format: "cjs",
            sourcemap: sourceMap,
        },
        plugins: [
            resolve({ extensions }),
            typescript(),
            terser(terserOptions),
        ],
    },
];

export default config;

function terser(options = {}) {
    return {
        name: "terser",

        renderChunk: (code) => terserMinify(code, options),
    };
}
