import ReactModal from 'react-modal';

function Item() {
  return (
    <div>
    <ReactModal parentSelector={() => document.querySelector('#item')} >testing </ReactModal>
    <li id='item'>testing Item</li>
    </div>
  )
}

export default Item