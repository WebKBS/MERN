import React, { useState, useContext } from 'react';
import './PlaceItem.css';
import Card from '../../shared/components/UiElement/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UiElement/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UiElement/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElement/LoadingSpinner';

const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(`http://localhost:4000/api/places/${props.id}`, 'DELETE');
      props.onDelete(props.id);
    } catch (err) {
      console.log('삭제실패', err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal show={showMap} onCancel={closeMapHandler} header={props.address} contentClass="place-item__modal-content" footerClass="place-item__modal-actions" footer={<Button onClick={closeMapHandler}>Close</Button>}>
        <div className="map-container">
          <h2>The MAP!</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="삭제하시겠습니까?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>삭제 후에는 취소할수 없습니다.</p>
      </Modal>
      <li className="place-item">
        <Card>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h2>{props.address}</h2>
            <h2>{props.description}</h2>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            {auth.isLoggedIn && <Button to={`/places/${props.id}`}>Edit</Button>}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
