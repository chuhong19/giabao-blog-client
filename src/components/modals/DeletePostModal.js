import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useReducer } from 'react';
import { PostsContext } from '../../contexts/PostsContext';
import AlertMessage from '../layout/AlertMessage';
import { DELETE_POST } from '../../contexts/constants';
import { allMyPostsReducer } from '../../reducers/allMyPostsReducer';

const DeletePostModal = () => {

    // eslint-disable-next-line no-unused-vars
    const [dummy, dispatch2] = useReducer(allMyPostsReducer, {
        post: null,
        allMyPosts: [],
        allMyPostsLoading: true,
    })

    const {
        allMyPostsState: { activePost },
        showDeletePostModal,
        setShowDeletePostModal,
        deletePost
    } = useContext(PostsContext);

    let postId = 0;

    if (activePost !== undefined) {
        postId = activePost.id;
    }

    const closeDialog = () => {
        setShowDeletePostModal(false);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await deletePost(postId);
        dispatch2({ type: DELETE_POST, payload: postId});
        setShowDeletePostModal(false);
    };

    return (
        <Modal show={showDeletePostModal} animation={false} onHide={closeDialog}>
            <AlertMessage info={alert} />
            <Modal.Header closeButton>
                <Modal.Title>Edit post</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <h1>Post id: {postId}</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit'>
                        Confirm delete
                    </Button>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default DeletePostModal;
