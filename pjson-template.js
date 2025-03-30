const package = {
    "name": "wksp-catalog",
    "version": "0.0.1",
    "private": true,
    "env": {
        "WORKSPACE": `~wrg/workspaces/${package.name}`
    }
};

const scripts = {
    "typecheck": "tsc --project tsconfig.json --noEmit",
    "prebuild": "WORKSPACE=${package.name}; echo \"Doing build for ${package.name} - cleanup\" ; rm -rf ${package.name} ; mkdir ${package.name}",
    "build": "tsc; npm pack; (cd ${package.name}; mv lib/* .; rmdir lib); tar cf ${package.name}-${package.version}.tgz ${package.name}; ls -l ${package.name}-${package.version}.tgz",
    "postbuild": "echo 'After build '",
    "test": "jest"
};

const theRest = {
    "eslintConfig": {
        "extends": [
            "react-app",
            "react-app/jest"
        ]
    },
    "overrides": {
        "glob": "10.4.2"
    },
    "devDependencies": {
        "@types/pug": "^2.0.10",
        "tsx": "^4.19.3",
        "typescript": "^4.9.5"
    },
    "dependencies": {
        "@npmcli/arborist": "^8.0.0",
        "@testing-library/jest-dom": "^5.16.5",
        "@types/jest": "^27.5.2",
        "@types/markdown-it": "^14.1.2",
        "@types/node": "^16.18.25",
        "commander": "^13.1.0",
        "${package.name}": "file:local_package_overrides/${package.name}",
        "markdown-it": "^14.1.0",
        "npm-packlist": "^9.0.0",
        "prettier": "^3.5.3",
        "pug": "^3.0.3",
        "pug-loader": "file:local_package_overrides/pug-loader",
        "tar": "^7.4.3",
        "tsc": "^2.0.4",
        "web-vitals": "^2.1.4"
    }
};


