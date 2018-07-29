export interface IPatchesConfig {
    top: number;
    left?: number;
    right?: number;
    bottom?: number;
}

const normalizePatchesConfig: (config: IPatchesConfig) => IPatchesConfig = (config: IPatchesConfig) => {
    config.bottom = config.bottom || config.top;
    config.left = config.left || config.top;
    config.right = config.right || config.left;
    return config;
};

export { normalizePatchesConfig };
