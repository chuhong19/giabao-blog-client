import { PostsContext } from "../contexts/PostsContext";
import { useContext, useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Spinner from 'react-bootstrap/esm/Spinner';
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import InfoPostModal from "../components/modals/InfoPostModal";
import ReportPostModal from "../components/modals/ReportModal";

const Dashboard = () => {

    // Contexts
    const {
        authState: {
            username
        },
    } = useContext(AuthContext);

    const {
        allPostsState: { allPosts, allPostsLoading },
        getAllPosts,
        setShowInfoPostModal,
        setShowReportPostModal,
    } = useContext(PostsContext)

    useEffect(() => {
        getAllPosts();
    }, []);

    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedPostAuthor, setSelectedPostAuthor] = useState(null);
    const [selectedPostCreatedAt, setSelectedPostCreatedAt] = useState(null);

    const handleShowInfoModal = (postId, postAuthorName, postCreatedAt) => {
        setShowInfoPostModal(true);
        setSelectedPostId(postId);
        setSelectedPostAuthor(postAuthorName);
        setSelectedPostCreatedAt(postCreatedAt);
    };

    const handleShowReportPostModal = (postId, postAuthorName) => {
        setShowReportPostModal(true);
        setSelectedPostId(postId);
        setSelectedPostAuthor(postAuthorName);
    }

    let body = null;

    if (allPostsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (allPosts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to Gia Bao blog</Card.Title>
                        <Card.Text>
                            Nothing here. Click the button below to create our first post
                        </Card.Text>
                        <Button
                            variant='primary'
                        >
                            Create post now
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <h1>Dashboard</h1>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {allPosts.map((post) => {
                        return (
                            <Col key={post.id} className='my-2'>
                                <SinglePost
                                    post={post}
                                    onShowInfoModal={() => handleShowInfoModal(post.id, post.authorName, post.createdAt)}
                                    onShowReportPostModal={() => handleShowReportPostModal(post.id, post.authorName)}
                                />
                            </Col>
                        )
                    })}
                </Row>
                {/* Open info post modal */}
                <InfoPostModal postId={selectedPostId} postAuthorName={selectedPostAuthor} postCreatedAt={selectedPostCreatedAt}/>
                 {/* Open report post modal */}
                <ReportPostModal postId={selectedPostId} postAuthorName={selectedPostAuthor} />
            </>
        )
    }
    return (
        <>
            {body}
        </>
    )
}

export default Dashboard;