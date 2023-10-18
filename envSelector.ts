import { environment as devEnvironment } from './env.dev';
import { environment as qaAutoEnvironment } from './env.qaAuto';
import { environment as qaIntEnvironment } from './env.qaInt';
import { environment as uatEnvironment } from './env.uat';

export const getEnvironmentConfig = (env: string) => {
    switch (env) {
        case 'dev':
            return devEnvironment;
        case 'qaAuto':
            return qaAutoEnvironment;
        case 'qaInt':
            return qaIntEnvironment;
        case 'uat':
            return uatEnvironment;
        default:
            throw new Error(`Unsupported environment: ${env}`);
    }
};
