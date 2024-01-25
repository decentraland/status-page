import { insertScript, isMobile } from './utils'

import { IntercomWindow, IntercomSettings } from './Intercom.types'

const intercomWindow = (window as unknown) as IntercomWindow

export class IntercomWidget {
  private _appId: string | undefined
  private _settings: IntercomSettings | undefined
  private client: ((method: string, arg?: any) => void) | undefined

  static instance: IntercomWidget

  private constructor() {}

  static getInstance(): IntercomWidget {
    if (!this.instance) {
      this.instance = new IntercomWidget()
    }
    return this.instance
  }

  set appId(id: string | undefined) {
    this._appId = id
  }

  get appId(): string | undefined {
    return this._appId
  }

  set settings(settings: IntercomSettings | undefined) {
    this._settings = settings
    if (settings) {
      intercomWindow.intercomSettings = settings
    }
  }

  get settings(): IntercomSettings | undefined {
    return this._settings
  }

  init(appId: string, settings?: IntercomSettings) {
    this.appId = appId
    this.client = getWindowClient(appId)
    if (settings) {
      this.settings = settings
    }
  }

  inject() {
    return new Promise<void>(resolve => {
      if (this.isInjected()) {
        return resolve()
      }

      const script = insertScript({
        src: `https://widget.intercom.io/widget/${this._appId}`
      })
      script.addEventListener('load', () => resolve(), true)
    }).then(() => {
      if (!this._appId) {
        throw new Error("No AppId defined")
      }

      this.client = getWindowClient(this._appId)
    })
  }

  render(data: Record<string, any> = {}) {
    if (!this.client) {
      throw new Error("Client not initialized")
    }

    this.client('reattach_activator')
    this.client('update', { ...data, app_id: this._appId })
  }

  showNewMessage(text: string) {
    if (!this.client) {
      throw new Error("Client not initialized")
    }

    this.client('showNewMessage', text)
  }

  unmount() {
    if (!this.client) {
      throw new Error("Client not initialized")
    }

    this.client('shutdown')
  }

  isInjected() {
    return isInjected()
  }
}

function getWindowClient(appId: string) {
  return (...args: any[]) => {
    if (!appId) {
      return console.warn(
        'Intercom app id empty. Check that the environment is propery set'
      )
    }

    if (isMobile()) {
      return
    }

    if (!isInjected()) {
      return console.warn('Intercom called before injection')
    }

    intercomWindow.Intercom!(...args)
  }
}

function isInjected() {
  return typeof intercomWindow.Intercom === 'function'
}
