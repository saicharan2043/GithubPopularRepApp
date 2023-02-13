import {Component} from 'react'
import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'
import LanguageFiltersItem from '../LanguageFilterItem'

import './index.css'

const findStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRespos extends Component {
  state = {
    respoonseData: [],
    tabId: languageFiltersData[0].id,
    status: findStatus.loading,
  }

  componentDidMount() {
    this.getItemDetails()
  }

  responseFailure = () => {
    this.setState({status: findStatus.failure})
  }

  getItemDetails = async () => {
    this.setState({status: findStatus.loading})
    const {tabId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${tabId}`,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(echValue => ({
        avatarUrl: echValue.avatar_url,
        forksCount: echValue.forks_count,
        id: echValue.id,
        issuesCount: echValue.issues_count,
        name: echValue.name,
        starsCount: echValue.stars_count,
      }))
      this.setState({respoonseData: updatedData, status: findStatus.success})
    } else {
      this.responseFailure()
    }
  }

  clickTab = id => {
    const findTab = languageFiltersData.filter(echValue => echValue.id === id)
    this.setState({tabId: findTab[0].id}, this.getItemDetails)
  }

  requestSuccess = () => {
    const {respoonseData} = this.state

    return (
      <ul className="item-un-order-list">
        {respoonseData.map(echValue => (
          <RepositoryItem items={echValue} key={echValue.id} />
        ))}
      </ul>
    )
  }

  requestFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something Went Worng</h1>
    </div>
  )

  loading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  displayRoot = () => {
    const {status} = this.state
    switch (status) {
      case findStatus.success:
        return this.requestSuccess()
      case findStatus.failure:
        return this.requestFailure()
      case findStatus.loading:
        return this.loading()
      default:
        return null
    }
  }

  render() {
    const {status, tabId} = this.state

    return (
      <div className="bg-color">
        <h1 className="mein-heading">Popular</h1>
        <ul className="tab-un-order-list">
          {languageFiltersData.map(echValue => (
            <LanguageFiltersItem
              tabs={echValue}
              key={echValue.id}
              clickTab={this.clickTab}
              isTrue={echValue.id === tabId}
            />
          ))}
        </ul>

        {this.displayRoot()}
      </div>
    )
  }
}

export default GithubPopularRespos
