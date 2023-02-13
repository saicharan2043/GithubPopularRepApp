// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {items} = props
  const {name, id, issuesCount, forksCount, starsCount, avatarUrl} = items

  return (
    <li className="list-of-items">
      <div className="avatar-img-container">
        <img src={avatarUrl} className="avatar-img" alt={name} />
        <h1 className="name">{name}</h1>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="icon-img"
          alt="stars"
        />
        <p className="icon-name">{`${starsCount} stars`}</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="icon-img"
          alt="forks"
        />
        <p className="icon-name">{`${forksCount} forks`}</p>
      </div>
      <div className="icon-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="icon-img"
          alt="open issues"
        />
        <p className="icon-name">{`${issuesCount} open issues`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
