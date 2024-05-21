import Button from 'react-bootstrap/Button'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext } from 'react';
import { PostsContext } from '../../contexts/PostsContext';

const MyPostActionButton = ({ id }) => {	

	const { findPost, setShowEditPostModal } =
    useContext(PostsContext);

  const choosePost = (postId) => {
    findPost(postId);
    setShowEditPostModal(true);
  };
	
	return (
		<>
			<Button className='post-button' onClick={choosePost.bind(this, id)}>
				<img src={editIcon} alt='edit' width='24' height='24' />
			</Button>
			<Button className='post-button'>
				<img src={deleteIcon} alt='delete' width='24' height='24' />
			</Button>
		</>
	)
}

export default MyPostActionButton;
