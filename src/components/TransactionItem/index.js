import './index.css'

const TransactionItem = props => {
  const {transDetails, onDeleteDetails} = props
  const {id, title, amount, type} = transDetails

  const onDeleteButtonClicked = () => {
    onDeleteDetails(id)
  }

  return (
    <li className="list">
      <p className="list-items-h">{title}</p>
      <p className="list-items-h">{amount}</p>
      <p className="list-items-h">{type}</p>
      <div>
        <button
          onClick={onDeleteButtonClicked}
          className="delete-button"
          type="button"
          testid="delete"
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
