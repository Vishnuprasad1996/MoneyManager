import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    moneyManagerList: [],
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachItem => eachItem.optionId === optionId,
    )
    const {displayText} = typeOption
    const newMoneyManagerList = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }
    this.setState(prevState => ({
      moneyManagerList: [...prevState.moneyManagerList, newMoneyManagerList],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteDetails = id => {
    const {moneyManagerList} = this.state
    const updatedList = moneyManagerList.filter(eachList => eachList.id !== id)

    this.setState({moneyManagerList: updatedList})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  getTotalIncome = () => {
    const {moneyManagerList} = this.state
    let incomeAmount = 0
    moneyManagerList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getTotalExpenses = () => {
    const {moneyManagerList} = this.state
    let expenseAmount = 0
    moneyManagerList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTransaction.amount
      }
    })
    return expenseAmount
  }

  getTotalBalance = () => {
    const {moneyManagerList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    moneyManagerList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {amount, title, optionId, moneyManagerList} = this.state
    const balanceAmount = this.getTotalBalance()
    const incomeAmount = this.getTotalIncome()
    const expensesAmount = this.getTotalExpenses()

    return (
      <div className="bg-cont">
        <div className="content-cont">
          <div className="name-cont">
            <h1 className="h-name">Hi, Richard</h1>
            <p className="desc">
              Welcome back to your{' '}
              <span className="desc-money-manager"> Money Manager</span>
            </p>
          </div>
          <ul className="money-details-cont">
            <MoneyDetails
              incomeAmount={incomeAmount}
              expensesAmount={expensesAmount}
              balanceAmount={balanceAmount}
            />
          </ul>
          <div className="form-history-cont">
            <form onSubmit={this.onSubmitForm} className="form">
              <div className="form-cont-container">
                <h1 className="h-add-trans">Add Transaction</h1>
                <label className="labels" htmlFor="title">
                  TITLE
                </label>
                <input
                  value={title}
                  onChange={this.onChangeTitle}
                  className="input-box"
                  id="title"
                  type="text"
                />
                <label className="labels" htmlFor="amount">
                  AMOUNT
                </label>
                <input
                  value={amount}
                  onChange={this.onChangeAmount}
                  className="input-box"
                  id="amount"
                  type="text"
                />
                <label className="labels" htmlFor="incomeOrExpense">
                  TYPE
                </label>
                <select
                  id="select"
                  value={optionId}
                  onChange={this.onChangeType}
                  className="select-box"
                >
                  {transactionTypeOptions.map(eachItem => (
                    <option key={eachItem.optionId} value={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>
                <div>
                  <button className="add-button" type="submit">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <div className="history-container">
              <div className="history-cont-container">
                <ul className="history-list-cont">
                  <h1 className="history">History</h1>
                  <li className="table-column-cont">
                    <p className="table-header-cell ">Title</p>
                    <p className="table-header-cell ">Amount</p>
                    <p className="table-header-cell ">Type</p>
                  </li>
                  {moneyManagerList.map(eachList => (
                    <TransactionItem
                      transDetails={eachList}
                      key={eachList.id}
                      onDeleteDetails={this.onDeleteDetails}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
