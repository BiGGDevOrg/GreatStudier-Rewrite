import { Application } from "@hotwired/stimulus"
import Hotkeys from 'stimulus-hotkeys'

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
application.register('hotkeys', Hotkeys)
