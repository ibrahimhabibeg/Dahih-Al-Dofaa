import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
import path from "path";
import "dotenv/config";

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: path.join(process.cwd(), "public", "icon"),
    extraResource: [
      path.join(process.cwd(), "public", "icon.png"),
      "./extraResources/ollama",
    ],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: path.join(process.cwd(), "public", "icon.ico"),
      iconUrl: path.join(process.cwd(), "public", "icon.ico"),
      title: "Dahih Al-Dofaa",
    }),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({
      options: {
        icon: path.join(process.cwd(), "public", "icon.png"),
        productName: "Dahih Al-Dofaa",
        genericName: "AI Assistant",
      },
    }),
    {
      name: "@electron-forge/maker-appx",
      config: {
        makeVersionWinStoreCompatible: true,
        packageName: "IbrahimHabib.DahihAlDofaa",
        packageDisplayName: "Dahih Al Dofaa",
        publisher: "CN=DD491B5B-784B-4745-A126-1F3F7715F281",
        publisherDisplayName: "Ibrahim Habib",
      },
    },
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/renderer/index.html",
            js: "./src/renderer/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/renderer/preload.ts",
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "ibrahimhabibeg",
          name: "Dahih-Al-Dofaa",
          token: process.env.GITHUB_TOKEN,
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
};

export default config;
