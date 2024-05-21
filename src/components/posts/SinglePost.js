import PostActionButton from './PostActionButton';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import infoIcon from '../../assets/info.svg';
import axios from 'axios';
import { apiUrl } from '../../contexts/constants';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

const SinglePost = ({
  post: { id, title, content, authorId, authorName },
  onShowInfoModal,
  onShowReportPostModal
}) => {

  const [likeStatus, setLikeStatus] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [comments, setComments] = useState([]);

  const formatDateTime = (isoDateTime) => {
    const date = parseISO(isoDateTime);
    return format(date, 'hh:mm dd/MM/yyyy');
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${apiUrl}/post/checkStatus`, {
        postId: id
      });
      setLikeStatus(response.data);

      // Fetch like and dislike counts
      const likeCountResponse = await axios.post(`${apiUrl}/post/getLikeCount`, { postId: id });
      const dislikeCountResponse = await axios.post(`${apiUrl}/post/getDislikeCount`, { postId: id });

      setLikeCount(likeCountResponse.data);
      setDislikeCount(dislikeCountResponse.data);

      const commentsResponse = await axios.post(`${apiUrl}/post/getAllComments`, { postId: id });
      setComments(commentsResponse.data);

    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowInfoModal = () => {
    onShowInfoModal();
  };

  const handleShowReportPostModal = () => {
    onShowReportPostModal();
  };

  let body = (
    <Card className='shadow'>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className='product-title'>{title}</p>
              <Badge variant='info'>Public</Badge>
            </Col>
            <Col className='text-right'>
              <PostActionButton
                id={id}
                authorId={authorId}
                onShowReportPostModal={() => handleShowReportPostModal()}
                likeStatus={likeStatus}
                triggerReload={fetchData}
              />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{content}</Card.Text>
        <Card.Text>ID: {id}</Card.Text>
        <Card.Text>
          Author: <Link to={`/stalk/${authorId}`}>
            {authorName}
          </Link>
        </Card.Text>
        <p>Like Count: {likeCount}</p>
        <p>Dislike Count: {dislikeCount}</p>
        <div>
          <h4>Comments:</h4>
          {comments.map(comment => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <h6>{formatDateTime(comment.createdAt)}</h6>
            </div>
          ))}
        </div>
        <Col>
          <Button onClick={handleShowInfoModal}>
            <img src={infoIcon} alt="info-post" width='20' height='20' />
          </Button>
        </Col>
      </Card.Body>
    </Card>
  );

  return (
    <>
      {body}
    </>
  );
}

export default SinglePost;
