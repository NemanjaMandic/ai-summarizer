import { ChatBot } from './components/ChatBot';
import { ReviewList } from './components/reviews/ReviewList';

function App() {
  return (
    <div className="p-4 h-screen">
      <ReviewList productId={1} />
      <ChatBot />
    </div>
  );
}

export default App;
