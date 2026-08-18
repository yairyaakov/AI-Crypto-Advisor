import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../api/dashboard';
import { submitVote } from '../api/votes';

function VoteButtons({ section, itemId }) {
  const [vote, setVote] = useState(null);

  async function handleVote(value) {
    const next = vote === value ? null : value;
    setVote(next);
    if (next !== null) {
      await submitVote({ section, itemId, value: next });
    }
  }

  return (
    <div className="vote-buttons">
      <button
        className={`vote-btn ${vote === 1 ? 'vote-active-up' : ''}`}
        onClick={() => handleVote(1)}
        title="Thumbs up"
      >👍</button>
      <button
        className={`vote-btn ${vote === -1 ? 'vote-active-down' : ''}`}
        onClick={() => handleVote(-1)}
        title="Thumbs down"
      >👎</button>
    </div>
  );
}

function SectionCard({ title, badge, children }) {
  return (
    <div className="section-card">
      <div className="section-header">
        <h2>{title}</h2>
        {badge && <span className="live-badge">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard()
      .then(res => {
        if (res.error) setError(res.error);
        else setData(res);
      })
      .catch(() => setError('Failed to load dashboard. Please try again.'));
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (error) return (
    <div className="dashboard-page">
      <p className="error">{error}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );

  if (!data) return <div className="dashboard-page loading">Loading your dashboard...</div>;

  const { preferences, news, prices, aiInsight, meme } = data;

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>AI Crypto Advisor</h1>
          <p className="dashboard-subtitle">
            Your daily dashboard · {preferences.investorType} investor ·{' '}
            {preferences.assets.join(', ')}
          </p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Log out</button>
      </header>

      <div className="dashboard-grid">

        {/* Market News */}
        <SectionCard title="📰 Market News" badge={news[0]?.live ? 'LIVE' : null}>
          <ul className="news-list">
            {news.map(item => (
              <li key={item.id} className="news-item">
                <div className="news-content">
                  <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                  <span className="news-meta">{item.source} · {item.relatedAsset}</span>
                </div>
                <VoteButtons section="news" itemId={item.id} />
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Coin Prices */}
        <SectionCard title="💰 Coin Prices" badge={prices[0]?.live ? 'LIVE' : null}>
          <ul className="prices-list">
            {prices.map(item => (
              <li key={item.id} className="price-item">
                <div className="price-info">
                  <span className="price-coin">{item.coin}</span>
                  <span className="price-name">{item.name}</span>
                </div>
                <div className="price-right">
                  <span className="price-value">
                    ${Number(item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: item.price < 1 ? 6 : 2 })}
                  </span>
                  <VoteButtons section="prices" itemId={item.id} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* AI Insight */}
        <SectionCard title="🤖 AI Insight of the Day" badge={aiInsight.live ? 'AI' : null}>
          <p className="insight-text">{aiInsight.text}</p>
          <VoteButtons section="aiInsight" itemId={aiInsight.id} />
        </SectionCard>

        {/* Meme */}
        <SectionCard title="😂 Crypto Meme of the Day">
          <div className="meme-container">
            <img src={meme.imageUrl} alt={meme.title} className="meme-img" />
            <p className="meme-title">{meme.title}</p>
            <p className="meme-text">{meme.text}</p>
            <VoteButtons section="meme" itemId={meme.id} />
          </div>
        </SectionCard>

      </div>
    </div>
  );
}

function Counter(){
  const [num, setNum] = useState(0);
  return(
  <div>
    <h1>num - {num}</h1>
    <button onClick = {() => setnume(num+1)}> + </button>
    <button onClick = {() => setnume(num-1)}> - </button>
  </div>
  );
}

///////////////////////////////////////////////////////

function ToggleMessage(){
  const [invisible, setInvisible] = useState(false);

  return(
    <div>
      <button onClick ={() => setInvisible(!invisible)}>
      {invisible? 'show' : 'hide'}
      </button>

      {{invisible} && <p> welcom </p>}
    </div>
  );
}

///////////////////////////////////////////////////////
function AssetList(){
  const assets = ['BTC', 'ETH', 'SOL', 'DOGE'];
  
  return(
    <div>
      <h1> Crypto Assets </h1>
      <ul>
        {assets.map(asset => (
          <li key={asset}>{asset}</li>
        ))}
      </ul>
    </div>
  );
}

///////////////////////////////////////////////////////

function TodoList(){
  const [text, setText] = useState('');  
  const [todos, setTodo] = useState([]);

  function HandleAdd(){
    if(text.trim === '') return
    setTodo(...todos, text);
    setText('');
  }

    return(
      <div>
        <input>
          value={text}
          type="text"
          onChange={e => setText(e.target.value)}
          placeholder="enter to do"
        </input>
        <button onClick = {() => HandleAdd()}>
          add
        </button>
        <ul>
          {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    );
}
////////////////////////////////////////////////////////

function UserCard({name, email, isActive}){
  return(
    <div>
      <P>Name: {name} </P>
      <P>Email: {email} </P>
      <P>Status: {isActive? 'Active' : 'Inactive'} </P>
    </div>
  );
}

////////////////////////////////////////////////////////

function ProductList(){
  const products = [
  { id: 1, name: 'Laptop', price: 4000 },
  { id: 2, name: 'Mouse', price: 120 },
  { id: 3, name: 'Keyboard', price: 250 },
  ];
  return(
    <div>
      <ul>
        {product.map(product => (
          <li key={product.id}> {product.name} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
}

///////////////////////////////////////////////////////////
function CoinCard({ coin }) {
  return (
    <li>
      {coin.symbol} - ${coin.price}
    </li>
  );
}

function CryptoWatchlist(){
  const [coins, setCoins] = useState([
  { id: 1, symbol: 'BTC', price: 65000 },
  { id: 2, symbol: 'ETH', price: 3200 },
  ]);
  const [text, setText] = useState('');

  function handleAdd() {
    if (text.trim() === '') return;

    const newCoin = {
      id: Date.now(),
      symbol: text.toUpperCase(),
      price: 0,
    };

    setCoins([...coins, newCoin]);
    setText('');
  }

  return(
    <div>
      <ul>
        {coins.map=(coin => (
          <CoinCard key={coin.id} coin={coin} /> 
        ))}
      </ul>
      <input>
        type="text"
        placeholder="add symbol"
        onchange={e => setText(e.target.value)}
        value={text}
      </input>
      <button onClick={handelAdd}>
        Add
      </button>
    </div>
  );
}

//////////////////////////////////////////////////////
function CoinCard({coin, onRemove}){
  return(
    <li>
      {coin.symbol} - {coin.price}
      <button onClick={() => onRemove(coin.id)}>
        Remove
      </button>
    </li>
  );
}
function CryptoWatchlist(){
  const [coins, setCoins] = useState([
  { id: 1, symbol: 'BTC', price: 65000 },
  { id: 2, symbol: 'ETH', price: 3200 },
  { id: 3, symbol: 'SOL', price: 150 },
  ]);

  function handleRemove(id){
    setCoins(coins.filter(coin=>coin.id!==id));
  }

  return(
    <div>
      <ul>
        {coins.map(coin => (
          <CoinCard
          key={coin.id}
          coin={coin}
          onRemove={handleRemove}
          />
        ))}
      </ul>
    </div>
  );
}

//////////////////////////////////////////////////

function CryptoFilter(){
  const coins = [
  { id: 1, symbol: 'BTC', name: 'Bitcoin', price: 65000 },
  { id: 2, symbol: 'ETH', name: 'Ethereum', price: 3200 },
  { id: 3, symbol: 'SOL', name: 'Solana', price: 150 },
  { id: 4, symbol: 'DOGE', name: 'Dogecoin', price: 0.15 },
  { id: 5, symbol: 'ADA', name: 'Cardano', price: 0.6 },
  ];

  const [search, setSearch] = useState('');

  const filteredCoins=coins.filter(coin => 
    coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
    coin.name.toLowerCase().includes(search.toLowerCase()));

  return(
    <div>
      <input>
        type="text"
        value={search}
        placeholder="search"
        onchange={(e) => setSearch(e.target.value)}
      </input>
      <ul>
        {filteredCoins.map(coin => (
          <li key={coin.id}>
            {coin.symbol} - {coin.name} - ${coin.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

///////////////////////////////////////////////////////////

function CryptoPriceFilter() {
  const coins = [
    { id: 1, symbol: 'BTC', name: 'Bitcoin', price: 65000 },
    { id: 2, symbol: 'ETH', name: 'Ethereum', price: 3200 },
    { id: 3, symbol: 'SOL', name: 'Solana', price: 150 },
    { id: 4, symbol: 'DOGE', name: 'Dogecoin', price: 0.15 },
    { id: 5, symbol: 'ADA', name: 'Cardano', price: 0.6 },
  ];

  const [filter, setFilter] = useState('all');

  const filteredCoins = coins.filter(coin => {
    if (filter === 'above') return coin.price > 1000;
    if (filter === 'below') return coin.price < 1000;
    return true;
  });

  return (
    <div>
      <h2>Crypto Price Filter</h2>

      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('above')}>Above 1000</button>
      <button onClick={() => setFilter('below')}>Below 1000</button>

      <ul>
        {filteredCoins.map(coin => (
          <li key={coin.id}>
            {coin.symbol} - {coin.name} - ${coin.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

//////////////////////////////////////////////////////////
import { useState } from 'react';

function CryptoCategoryFilter() {
  const coins = [
    { id: 1, symbol: 'BTC', name: 'Bitcoin', category: 'large-cap' },
    { id: 2, symbol: 'ETH', name: 'Ethereum', category: 'large-cap' },
    { id: 3, symbol: 'SOL', name: 'Solana', category: 'mid-cap' },
    { id: 4, symbol: 'DOGE', name: 'Dogecoin', category: 'meme' },
    { id: 5, symbol: 'SHIB', name: 'Shiba Inu', category: 'meme' },
  ];

  const [category, setCategory] = useState('all');

  const filteredCoins = coins.filter(coin => {
    if (category === 'all') return true;
    return coin.category === category;
  });

  return (
    <div>
      <h2>Crypto Category Filter</h2>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All</option>
        <option value="large-cap">Large Cap</option>
        <option value="mid-cap">Mid Cap</option>
        <option value="meme">Meme</option>
      </select>

      <ul>
        {filteredCoins.map(coin => (
          <li key={coin.id}>
            {coin.symbol} - {coin.name} - {coin.category}
          </li>
        ))}
      </ul>
    </div>
  );
}


///////////////////////////////////////////////////////

function UserStatus() {
  const [status, setStatus] = useState('guest');

  return (
    <div>
      <h2>User Status</h2>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="guest">Guest</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      {status === 'guest' && (
        <p>Welcome guest, please log in.</p>
      )}

      {status === 'user' && (
        <p>Welcome back, regular user.</p>
      )}

      {status === 'admin' && (
        <p>Welcome admin, you have full access.</p>
      )}
    </div>
  );
}

/////////////////////////////////////////////////

function ProductItem({ item, onAdd, onSub }) {
  return (
    <li>
      {item.name} - {item.price}₪ - Quantity: {item.quantity}

      <button onClick={() => onAdd(item.id)}>
        +
      </button>

      <button onClick={() => onSub(item.id)}>
        -
      </button>
    </li>
  );
}

function ProductQuantities() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 4000, quantity: 0 },
    { id: 2, name: 'Mouse', price: 120, quantity: 0 },
    { id: 3, name: 'Keyboard', price: 250, quantity: 0 },
  ]);

  function handleAdd(id) {
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }

      return product;
    }));
  }

  function handleSub(id) {
    setProducts(products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          quantity: Math.max(product.quantity - 1, 0),
        };
      }

      return product;
    }));
  }

  const totalItems = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div>
      <h2>Product Quantities</h2>

      <ul>
        {products.map(product => (
          <ProductItem
            key={product.id}
            item={product}
            onAdd={handleAdd}
            onSub={handleSub}
          />
        ))}
      </ul>

      <p>Total items: {totalItems}</p>
      <p>Total price: {totalPrice}₪</p>
    </div>
  );
}

/////////////////////////////////////////////

function UsersSearch(){
  const[loading, setLoading] = useState(false)
  const[eror, setError] = useState('')
  const[users, setUsers] = useState([])

  function handleRemove({name, email}){
    const filteredUsers = users.filter(user => {
      if(user.name===name)return true;
    });
  }
   
}

///////////////////////////////////////////////////

function UsersSearch(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try{
        const response  = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok){ 
          throw new error ('failed to load users');
        }
        const data = await response.json();
        setUsers(data);
      }
      catch(err){
          setError('failed to load users');
      }
      finally{
        setLoading(false);
      }
    }
    loadUsers();
  }, [])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
   if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return(
    <div>
      <h2>Users Search</h2>
      <input
        value={search}
        type="text"
        onChange="Search by name or email"
        placeholder={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
/////////////////////////////////////////////
function PostsByUser(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedUser, setsSelectedUser] = useState('all');

  useEffect(() => {
    async function loadPosts() {
      try{
        const response  = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok){ 
          throw new error ('failed to load users');
        }
        const data = await response.json();
        setPosts(data);
      }
      catch(err){
          setError('failed to load posts');
      }
      finally{
        setLoading(false);
      }
    }
    loadPosts();
  }, [])

  const filteredPosts = posts.filter(post => {
    if (selectedUser === 'all') return true;
    return post.userId === Number(selectedUser);
  });

   if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return(
    <div>
      <h2>Posts</h2>
      <select
        value={selectedUser}
        onchange={(e) => setsSelectedUser(e.target.value)}
        >
        <option value="all">All </option>
        <option value="1">User 1 </option>
        <option value="2">User 2 </option>
        <option value="3">User 3 </option>
        </select> 
      <ul>
        {filteredPosts(user => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

/////////////////////////////////////////////////////////////

const users = [
  { id: 1, name: 'Yair' },
  { id: 2, name: 'Dana' },
  { id: 3, name: 'Noa' },
];

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => id === user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

/////////////////////////////////////////////////////////

let users = [
  { id: 1, name: 'Yair', email: 'yair@gmail.com' },
  { id: 2, name: 'Dana', email: 'dana@gmail.com' },
];

let nextId = 3;

app.post('/api/users', (req, res) => {
  const {name, email} = req.body;
  if(!name || !email){
    res.status(400).json({error:'name or email are missing',});
  }
  const emailInUsed = users.some(user => email==user.email);
  if(emailInUsed){
    res.status(409).json({error:'Email already exists',});
  }
  const newUser = 
  {id: nextId,
    name,
    email,
  };
  users.push(newUser);
  nextId++;

  res.status(201).json(newUser);
});
//////////////////////////////////////////////////////////////

let cars = [
  { id: 1, model: 'Toyota Corolla', available: true },
  { id: 2, model: 'Mazda 3', available: true },
  { id: 3, model: 'Hyundai i20', available: false },
];

let bookings = [];

let nextBookingId = 1;

app.post('/api/bookings', (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;

  if (!userId || !carId || !startDate || !endDate) {
    return res.status(400).json({ error: 'missing fields' });
  }

  if (new Date(endDate) <= new Date(startDate)) {
    return res.status(400).json({ error: 'endDate must be after startDate' });
  }

  const carReq = cars.find(car => car.id === Number(carId));

  if (!carReq) {
    return res.status(404).json({ error: 'car not found' });
  }

  if (!carReq.available) {
    return res.status(409).json({ error: 'car is not available' });
  }

  const newBooking = {
    bookingId: nextBookingId,
    userId,
    carId,
    startDate,
    endDate,
  };

  bookings.push(newBooking);
  nextBookingId++;

  carReq.available = false;

  return res.status(201).json(newBooking);
});

///////////////////////////////////////////////////////

let cars = [
  { id: 1, model: 'Toyota Corolla' },
  { id: 2, model: 'Mazda 3' },
  { id: 3, model: 'Hyundai i20' },
];

let bookings = [
  {
    id: 1,
    userId: 10,
    carId: 1,
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    status: 'confirmed',
  },
];

let nextBookingId = 2;

app.post('/api/bookings', (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;

  if (!userId || !carId || !startDate || !endDate) {
    return res.status(400).json({ error: 'missing fields' });
  }

  const carReq = cars.find(car => car.id === Number(carId));

  if (!carReq) {
    return res.status(404).json({ error: 'car not found' });
  }

  if (!carReq.available) {
    return res.status(409).json({ error: 'car is not available' });
  }

  const carReq = bookings.find(book => book.carId === Number(carId));

  if (carReq && carReq.startDate < endDate && carReq.endDate > startDate) {
    return res.status(400).json({ error: 'car in used' });
  }

  const newBooking = {
    bookingId: nextBookingId,
    userId,
    carId,
    startDate,
    endDate,
  };

  bookings.push(newBooking);
  nextBookingId++;

  carReq.available = false;

  return res.status(201).json(newBooking);
});

///////////////////////////////////////////////////////
let events = [
  {
    id: 1,
    name: 'Rock Concert',
    capacity: 5,
  },
  {
    id: 2,
    name: 'Tech Conference',
    capacity: 3,
  },
];

let bookings = [
  {
    id: 1,
    eventId: 1,
    userId: 10,
    quantity: 2,
    status: 'confirmed',
  },
  {
    id: 2,
    eventId: 1,
    userId: 11,
    quantity: 1,
    status: 'confirmed',
  },
];

let nextBookingId = 3;

app.post('/api/bookings', (req, res) => {
  const {eventId, userId, quantity} = req.body;
  
  if(!eventId || !userId || !quantity){
    return res.status(400).json({error:'missing fields'});
  }

  if(quantity<=0){
    return res.status(400).json({error:'quantity must be positive'});
  }

  const wantedEvent = events.find(event => event.id === eventId);
  if(!wantedEvent){
    return res.status(404).json({error:'event not found'});
  }

  const isOrderdBefore = bookings.find(booking => booking.eventId === eventId  && booking.userId === userId && 
    booking.status === 'confirmed'
  );
  if(isOrderdBefore){
    return res.status(409).json({error:'user already has a booking for this event'});
  }

  const soldTickets = bookings.filter(booking => booking.eventId === eventId && 
    booking.status === 'confirmed').reduce((sum, booking) => sum + booking.quantity, 0);
    

  if(Number(quantity) > wantedEvent.capacity-soldTickets){
    return res.status(409).json({error:'not enough tickets available'});
  }

  let newBooking = {
    id: nextBookingId,
    eventId,
    userId,
    quantity,
    status: 'confirmed'
  }
  nextBookingId++;
  bookings.push(newBooking);
  return res.status(201).json(newBooking);
});