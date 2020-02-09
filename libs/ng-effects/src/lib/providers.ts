import { ConnectFactory, injectAll } from "./internals/utils"
import { Effects } from "./internals/effects"
import { EFFECTS, HOST_INITIALIZER, STRICT_MODE } from "./constants"
import { DefaultEffectOptions, EffectOptions } from "./decorators"
import { Type } from "@angular/core"
import { DestroyObserver } from "./internals/destroy-observer"

export function effects(types: Type<any> | Type<any>[] = [], effectOptions?: DefaultEffectOptions) {
    return [
        {
            provide: EFFECTS,
            deps: [].concat(types as any),
            useFactory: injectAll,
        },
        {
            provide: EffectOptions,
            useValue: effectOptions,
        },
        {
            provide: Connect,
            useClass: ConnectFactory,
        },
        {
            provide: HOST_INITIALIZER,
            useValue: Effects,
            multi: true,
        },
        DestroyObserver,
        [Effects],
        types,
    ]
}

export interface Connect {
    // tslint:disable-next-line
    <T>(context: T): void
}

export abstract class Connect {}

export const HOST_EFFECTS = effects()

export const USE_STRICT_EFFECTS = {
    provide: STRICT_MODE,
    useValue: true,
}
