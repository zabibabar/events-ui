import { Component } from '@angular/core'

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  isDark = false

  toggleDarkTheme() {
    if (this.isDark) {
      this.removeStyle('dark-theme')
      document.body.classList.remove('dark-theme')
      this.isDark = false
    } else {
      const href = 'dark-theme.css'
      getLinkElementForKey('dark-theme').setAttribute('href', href)
      document.body.classList.add('dark-theme')
      this.isDark = true
    }
  }

  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key)
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement)
    }
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key)
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`)
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link')
  linkEl.setAttribute('rel', 'stylesheet')
  linkEl.classList.add(getClassNameForKey(key))
  document.head.appendChild(linkEl)
  return linkEl
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`
}
