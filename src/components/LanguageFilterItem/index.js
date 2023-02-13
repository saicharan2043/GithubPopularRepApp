// Write your code here
import './index.css'

const LanguageFiltersItem = props => {
  const {tabs, clickTab, isTrue} = props
  const {id, language} = tabs
  const CssEl = isTrue ? 'add-border' : ''

  const onTabClick = () => {
    clickTab(id)
  }

  return (
    <li className="list-of-tabs">
      <button className={`list-button ${CssEl}`} onClick={onTabClick}>
        <p className="tab-text">{language}</p>
      </button>
    </li>
  )
}

export default LanguageFiltersItem
