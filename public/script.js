const API="/api";
const FALLBACK_BOOKS=[
{id:1,title:"The Alchemist",author:"Paulo Coelho",category:"Fiction",price:299,stock:12,rating:4.6,cover:"https://covers.openlibrary.org/b/isbn/0062502182-L.jpg",description:"A philosophical story about dreams, courage and following your personal legend."},
{id:2,title:"Atomic Habits",author:"James Clear",category:"Self-Help",price:399,stock:20,rating:4.8,cover:"https://covers.openlibrary.org/b/isbn/0735211299-L.jpg",description:"A practical guide to building good habits through small, consistent changes."},
{id:3,title:"Clean Code",author:"Robert C. Martin",category:"Technology",price:599,stock:8,rating:4.5,cover:"https://covers.openlibrary.org/b/isbn/0132350882-L.jpg",description:"A handbook of agile software craftsmanship and maintainable code."},
{id:4,title:"Sapiens",author:"Yuval Noah Harari",category:"History",price:450,stock:15,rating:4.7,cover:"https://covers.openlibrary.org/b/isbn/0062316095-L.jpg",description:"A brief history of humankind and the ideas that shaped our world."},
{id:5,title:"The Silent Patient",author:"Alex Michaelides",category:"Thriller",price:350,stock:10,rating:4.4,cover:"https://covers.openlibrary.org/b/isbn/1250301696-L.jpg",description:"A psychological thriller built around a mysterious silence and a hidden truth."},
{id:6,title:"Introduction to Algorithms",author:"Cormen, Leiserson, Rivest, Stein",category:"Technology",price:899,stock:5,rating:4.6,cover:"https://covers.openlibrary.org/b/isbn/0262033844-L.jpg",description:"A classic reference for algorithms, data structures and computational thinking."},
{id:7,title:"Rich Dad Poor Dad",author:"Robert Kiyosaki",category:"Self-Help",price:249,stock:25,rating:4.3,cover:"https://covers.openlibrary.org/b/isbn/1612680194-L.jpg",description:"A popular introduction to financial mindset, assets and money management."},
{id:8,title:"Harry Potter and the Sorcerer's Stone",author:"J.K. Rowling",category:"Fiction",price:499,stock:18,rating:4.9,cover:"https://covers.openlibrary.org/b/isbn/0590353403-L.jpg",description:"The magical first adventure of Harry Potter at Hogwarts."},
{id:9,title:"Ikigai",author:"Héctor García & Francesc Miralles",category:"Self-Help",price:329,stock:14,rating:4.5,cover:"https://covers.openlibrary.org/b/isbn/0143130722-L.jpg",description:"A gentle exploration of purpose, balance and meaningful living."},
{id:10,title:"The Psychology of Money",author:"Morgan Housel",category:"Business",price:380,stock:16,rating:4.7,cover:"https://covers.openlibrary.org/b/isbn/0857197681-L.jpg",description:"Timeless lessons about wealth, behaviour, risk and financial decisions."},
{id:24,title:"The Psychology of Money",author:"Morgan Housel",category:"Finance",price:399,stock:14,rating:4.7,cover:"https://covers.openlibrary.org/b/isbn/0857197681-L.jpg",description:"Timeless lessons on wealth, behaviour, risk and making better financial decisions."},
{id:25,title:"Think and Grow Rich",author:"Napoleon Hill",category:"Self-Help",price:299,stock:18,rating:4.5,cover:"https://covers.openlibrary.org/b/isbn/1585424331-L.jpg",description:"A classic personal-development book about goals, persistence and achievement."},
{id:26,title:"The Great Gatsby",author:"F. Scott Fitzgerald",category:"Classics",price:249,stock:16,rating:4.4,cover:"https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",description:"A celebrated American classic exploring ambition, love and the American dream."},
{id:27,title:"1984",author:"George Orwell",category:"Classics",price:279,stock:20,rating:4.7,cover:"https://covers.openlibrary.org/b/isbn/0451524934-L.jpg",description:"A powerful dystopian novel about surveillance, freedom and control."},
{id:28,title:"The Hobbit",author:"J.R.R. Tolkien",category:"Fantasy",price:399,stock:15,rating:4.8,cover:"https://covers.openlibrary.org/b/isbn/054792822X-L.jpg",description:"An adventurous fantasy journey from the Shire to the Lonely Mountain."},
{id:29,title:"Deep Work",author:"Cal Newport",category:"Productivity",price:449,stock:13,rating:4.6,cover:"https://covers.openlibrary.org/b/isbn/1455586692-L.jpg",description:"A practical guide to focused work and building valuable skills in a distracted world."},
{id:30,title:"The Power of Now",author:"Eckhart Tolle",category:"Self-Help",price:349,stock:12,rating:4.5,cover:"https://covers.openlibrary.org/b/isbn/1577314808-L.jpg",description:"An introduction to mindfulness and living with greater awareness in the present moment."},
{id:31,title:"The Lean Startup",author:"Eric Ries",category:"Business",price:499,stock:10,rating:4.4,cover:"https://covers.openlibrary.org/b/isbn/0307887898-L.jpg",description:"A practical approach to building products, testing ideas and learning from customers."},
{id:32,title:"Wings of Fire",author:"A.P.J. Abdul Kalam",category:"Biography",price:299,stock:20,rating:4.8,cover:"https://covers.openlibrary.org/b/isbn/8173711461-L.jpg",description:"The inspiring life story and journey of A.P.J. Abdul Kalam."},
{id:33,title:"The Midnight Library",author:"Matt Haig",category:"Fiction",price:429,stock:11,rating:4.6,cover:"https://covers.openlibrary.org/b/isbn/0525559474-L.jpg",description:"A thoughtful novel about choices, possibilities and the lives we could have lived."},
{id:34,title:"The Complete Works of William Shakespeare",author:"William Shakespeare",category:"Premium Classics",price:1499,stock:7,rating:4.8,cover:"https://covers.openlibrary.org/b/isbn/9780517223627-L.jpg",description:"A premium collection edition of Shakespeare's celebrated plays and poetry."},
{id:35,title:"The Art of War — Deluxe Edition",author:"Sun Tzu",category:"Premium Classics",price:1699,stock:6,rating:4.7,cover:"https://covers.openlibrary.org/b/isbn/9781599869773-L.jpg",description:"A collector-style edition of the classic work on strategy and leadership."},
{id:36,title:"The Lord of the Rings",author:"J.R.R. Tolkien",category:"Fantasy",price:1899,stock:8,rating:4.9,cover:"https://covers.openlibrary.org/b/isbn/9780261102385-L.jpg",description:"A premium edition of Tolkien's epic fantasy journey across Middle-earth."},
{id:37,title:"The Complete Sherlock Holmes",author:"Arthur Conan Doyle",category:"Mystery",price:2199,stock:5,rating:4.8,cover:"https://covers.openlibrary.org/b/isbn/9780517223610-L.jpg",description:"A large collection edition featuring the legendary detective Sherlock Holmes."},
{id:38,title:"The Chronicles of Narnia — Complete Collection",author:"C.S. Lewis",category:"Fantasy",price:2399,stock:7,rating:4.8,cover:"https://covers.openlibrary.org/b/isbn/9780064405373-L.jpg",description:"A complete fantasy collection of the classic Chronicles of Narnia."},
{id:39,title:"The Oxford English Dictionary — Collector Edition",author:"Oxford Languages",category:"Reference",price:2799,stock:4,rating:4.7,cover:"https://covers.openlibrary.org/b/isbn/9780198611868-L.jpg",description:"A premium reference-style dictionary edition for serious readers."},
{id:40,title:"The Harvard Classics — Selected Collection",author:"Harvard Classics",category:"Reference",price:3199,stock:5,rating:4.6,cover:"https://covers.openlibrary.org/b/isbn/9780517223627-L.jpg",description:"A curated premium collection inspired by classic literature and learning."},
{id:41,title:"The Complete Novels of Jane Austen",author:"Jane Austen",category:"Premium Classics",price:3499,stock:5,rating:4.9,cover:"https://covers.openlibrary.org/b/isbn/9780517223634-L.jpg",description:"A premium collection edition of Jane Austen's major novels."},
{id:42,title:"The Illustrated Bible — Premium Edition",author:"Various",category:"Premium Collection",price:3999,stock:4,rating:4.8,cover:"https://covers.openlibrary.org/b/isbn/9780310445633-L.jpg",description:"A premium illustrated reading edition with a gift-book presentation."},
{id:43,title:"The Complete Works of Charles Dickens",author:"Charles Dickens",category:"Premium Classics",price:4499,stock:3,rating:4.9,cover:"https://covers.openlibrary.org/b/isbn/9780517223603-L.jpg",description:"A large premium collection celebrating the works of Charles Dickens."}

];

function getCart(){return JSON.parse(localStorage.getItem("booknest_cart")||"[]")}
function saveCart(c){localStorage.setItem("booknest_cart",JSON.stringify(c));updateCartCount()}
function updateCartCount(){const e=document.getElementById("cartCount");if(e)e.textContent=getCart().reduce((s,i)=>s+i.qty,0)}
function showToast(m){const e=document.getElementById("toast");if(!e)return;e.textContent=m;e.classList.remove("hidden");clearTimeout(window.__toast);window.__toast=setTimeout(()=>e.classList.add("hidden"),2200)}
function closeModal(id){const e=document.getElementById(id);if(e)e.classList.add("hidden")}
function openModal(id){const e=document.getElementById(id);if(e)e.classList.remove("hidden")}
window.closeModal=closeModal;

async function fetchBooks(){
 try{const r=await fetch(`${API}/books`);if(!r.ok)throw 0;const apiBooks=await r.json();const byId=new Map(apiBooks.map(b=>[Number(b.id),b]));FALLBACK_BOOKS.forEach(b=>{if(!byId.has(Number(b.id)))byId.set(Number(b.id),b)});return [...byId.values()]}catch(e){return FALLBACK_BOOKS}
}
async function initStorefront(){
 const grid=document.getElementById("bookGrid");if(!grid)return;
 const books=await fetchBooks();window.BOOKS=books;
 const cats=[...new Set(books.map(b=>b.category))];
 const cf=document.getElementById("categoryFilter");
 cats.forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=c;cf.appendChild(o)});
 renderChips(cats);let active="All";
 function render(){
   let list=[...books], q=(document.getElementById("searchInput").value||"").toLowerCase();
   if(q)list=list.filter(b=>(b.title+" "+b.author+" "+b.category).toLowerCase().includes(q));
   if(active!=="All")list=list.filter(b=>b.category===active);
   if(cf.value!=="All")list=list.filter(b=>b.category===cf.value);
   const s=document.getElementById("sortFilter").value;
   if(s==="price-asc")list.sort((a,b)=>a.price-b.price);if(s==="price-desc")list.sort((a,b)=>b.price-a.price);if(s==="rating")list.sort((a,b)=>b.rating-a.rating);
   grid.innerHTML=list.map(bookCard).join("");renderLikeButtons();document.getElementById("emptyMsg").classList.toggle("hidden",list.length>0);
 }
 function renderChips(cats){document.getElementById("categoryChips").innerHTML=["All",...cats].map(c=>`<button class="chip ${c==="All"?"active":""}" data-cat="${c}">${c}</button>`).join("");document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{active=b.dataset.cat;cf.value=active==="All"?"All":active;document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x===b));render()})}
 window.setCategory=(c)=>{active=c;cf.value=c;document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x.dataset.cat===c));render();document.getElementById("catalog").scrollIntoView({behavior:"smooth"})};
 document.getElementById("searchInput").oninput=render;cf.onchange=()=>{active=cf.value;document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x.dataset.cat===active));render()};document.getElementById("sortFilter").onchange=render;
 render();
}
function stars(r){return "★".repeat(Math.round(r))+"☆".repeat(5-Math.round(r))}
function isLiked(id){return getLikes().includes(Number(id))}
function getLikes(){return JSON.parse(localStorage.getItem("booknest_likes")||"[]")}
function saveLikes(v){localStorage.setItem("booknest_likes",JSON.stringify(v));updateLikeCount()}
function toggleLike(id){const likes=getLikes(),n=Number(id),i=likes.indexOf(n);if(i>=0){likes.splice(i,1);showToast("Removed from liked books")}else{likes.push(n);showToast("Added to liked books ❤️")}saveLikes(likes);renderLikeButtons()}
function updateLikeCount(){const e=document.getElementById("likeCount");if(e)e.textContent=getLikes().length}
function renderLikeButtons(){document.querySelectorAll("[data-like-id]").forEach(e=>{const liked=isLiked(e.dataset.likeId);e.classList.toggle("liked",liked);e.textContent=liked?"♥":"♡";e.title=liked?"Remove from liked books":"Like this book"})}
function openLikedBooks(){const books=window.BOOKS||[];const likes=getLikes();const liked=books.filter(b=>likes.includes(Number(b.id)));const el=document.getElementById("likedList");if(!el)return;el.innerHTML=liked.length?liked.map(b=>`<div class="liked-row"><img src="${b.cover}" alt="${escapeHtml(b.title)}"><div><b>${escapeHtml(b.title)}</b><span>${escapeHtml(b.author)} · ₹${b.price}</span></div><button class="btn ghost" onclick="openDetail(${b.id})">View</button></div>`).join(""):`<div class="empty-cart"><div>♡</div><h3>No liked books yet</h3><p>Tap the heart on any book to save it here.</p></div>`;openModal("likedModal")}
window.toggleLike=toggleLike;window.openLikedBooks=openLikedBooks;
function bookCard(b){return `<article class="book-card" onclick="openDetail(${b.id})"><div class="cover-wrap"><img src="${b.cover}" alt="${escapeHtml(b.title)}" onerror="this.src='https://via.placeholder.com/300x420?text=Book'"><span class="tag">${escapeHtml(b.category)}</span><button class="like-btn ${isLiked(b.id)?"liked":""}" data-like-id="${b.id}" onclick="event.stopPropagation();toggleLike(${b.id})" aria-label="Like ${escapeHtml(b.title)}">${isLiked(b.id)?"♥":"♡"}</button></div><div class="book-body"><h3>${escapeHtml(b.title)}</h3><p class="author">by ${escapeHtml(b.author)}</p><div class="rating"><span>${stars(b.rating)}</span> ${b.rating}</div><div class="book-bottom"><strong>₹${b.price.toLocaleString("en-IN")}</strong><span class="old">₹${Math.round(b.price*1.35).toLocaleString("en-IN")}</span></div><button class="btn primary full" onclick="event.stopPropagation();addToCart(${b.id})">Add to Cart</button></div></article>`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
async function addToCart(id){const books=window.BOOKS||await fetchBooks();const b=books.find(x=>x.id===id);if(!b)return;let c=getCart(),x=c.find(i=>i.id===id);if(x)x.qty++;else c.push({id:b.id,title:b.title,author:b.author,price:b.price,cover:b.cover,qty:1});saveCart(c);showToast(`"${b.title}" added to your cart`)}
window.addToCart=addToCart;
async function openDetail(id){const books=window.BOOKS||await fetchBooks();const b=books.find(x=>x.id===id);if(!b)return;document.getElementById("detailContent").innerHTML=`<div class="detail-grid"><img src="${b.cover}" alt="${escapeHtml(b.title)}"><div><div class="eyebrow">${escapeHtml(b.category)}</div><h2>${escapeHtml(b.title)}</h2><p class="author">by ${escapeHtml(b.author)}</p><div class="rating big">${stars(b.rating)} <b>${b.rating}</b></div><p class="detail-desc">${escapeHtml(b.description)}</p><div class="detail-price">₹${b.price} <span>₹${Math.round(b.price*1.35)}</span></div><div class="detail-actions"><button class="btn primary" onclick="addToCart(${b.id});closeModal('detailModal')">Add to Cart</button><button class="btn ghost" onclick="location.href='cart.html'">View Cart</button></div><div class="mini-features"><span>✓ In stock</span><span>✓ Easy returns</span><span>✓ Secure payment</span></div></div></div>`;openModal("detailModal")}
window.openDetail=openDetail;

function getUser(){return JSON.parse(localStorage.getItem("booknest_user")||"null")}
function getSavedAccount(){return JSON.parse(localStorage.getItem("booknest_account")||"null")}
function updateAccountUI(){
 const b=document.getElementById("accountBtn");
 const out=document.getElementById("logoutBtn");
 const u=getUser();
 if(b){b.innerHTML=u?`👤 <span class="account-name">${escapeHtml(u.name)}</span>`:`Sign In`;}
 if(out)out.classList.toggle("hidden",!u);
}
function openAuthModal(){
 const u=getUser();
 if(u){showToast(`You are signed in as ${u.name}. Use Logout to switch accounts.`);return}
 switchAuth("login");openModal("authModal");
}
window.openAuthModal=openAuthModal;
function switchAuth(t){
 const lf=document.getElementById("loginForm"),sf=document.getElementById("signupForm"),lt=document.getElementById("loginTab"),st=document.getElementById("signupTab");
 if(lf)lf.classList.toggle("hidden",t!=="login");
 if(sf)sf.classList.toggle("hidden",t!=="signup");
 if(lt)lt.classList.toggle("active",t==="login");
 if(st)st.classList.toggle("active",t==="signup");
}
window.switchAuth=switchAuth;
function signup(e){
 e.preventDefault();
 const name=document.getElementById("signupName").value.trim();
 const email=document.getElementById("signupEmail").value.trim().toLowerCase();
 const password=document.getElementById("signupPassword").value;
 if(password.length<6){showToast("Password must be at least 6 characters");return}
 const existing=getSavedAccount();
 if(existing&&existing.email===email){showToast("Account already exists. Please sign in.");switchAuth("login");return}
 const account={name,email,password};
 localStorage.setItem("booknest_account",JSON.stringify(account));
 localStorage.setItem("booknest_user",JSON.stringify({name,email}));
 closeModal("authModal");updateAccountUI();showToast(`Welcome, ${name}! You are now signed in.`);if(new URLSearchParams(location.search).get("return")==="cart")location.href="cart.html";
}
function login(e){
 e.preventDefault();
 const email=document.getElementById("loginEmail").value.trim().toLowerCase();
 const password=document.getElementById("loginPassword").value;
 const saved=getSavedAccount();
 if(!saved||saved.email!==email){showToast("Account not found. Please create an account first.");return}
 if(!saved.password||saved.password!==password){showToast("Incorrect password. Please try again.");return}
 const u={name:saved.name,email:saved.email};
 localStorage.setItem("booknest_user",JSON.stringify(u));
 closeModal("authModal");updateAccountUI();showToast(`Welcome back, ${u.name}!`);if(new URLSearchParams(location.search).get("return")==="cart")location.href="cart.html";
}
function logout(){
 localStorage.removeItem("booknest_user");
 updateAccountUI();
 showToast("You have been logged out.");
}
window.signup=signup;window.login=login;window.logout=logout;

function getOrders(){
 const u=getUser();
 if(!u)return [];
 return JSON.parse(localStorage.getItem("booknest_orders_"+u.email)||"[]");
}
function saveOrders(o){
 const u=getUser();
 if(u)localStorage.setItem("booknest_orders_"+u.email,JSON.stringify(o));
}
function openOrdersModal(){
 if(!getUser()){showToast("Please sign in to view Orders & Returns");openAuthModal();return}
 const list=document.getElementById("ordersList");if(!list)return;
 const orders=getOrders();
 list.innerHTML=orders.length?orders.map((o,oi)=>`<div class="order-card"><div class="order-top"><div><b>${o.id}</b><span>${o.date}</span></div><span class="status">${o.status||"Confirmed"}</span></div>${o.items.map((it,ii)=>`<div class="order-item"><img src="${it.cover}"><div><b>${escapeHtml(it.title)}</b><span>Qty ${it.qty} • ₹${it.price}</span>${it.returnStatus?`<small class="success">${it.returnStatus}</small>`:`<button class="return-link" onclick="openReturn(${oi},${ii})">Return / Exchange</button>`}</div></div>`).join("")}<div class="order-total">Total <b>₹${o.total}</b></div></div>`).join(""):`<div class="empty-cart"><div>📦</div><h3>No orders yet</h3><p>Your completed purchases will appear here.</p><a href="index.html" class="btn primary">Start Shopping</a></div>`;
 openModal("ordersModal");
}
window.openOrdersModal=openOrdersModal;
function openReturn(oi,ii){const o=getOrders()[oi],it=o.items[ii];if(!o||!it)return;window.returnContext={oi,ii};document.getElementById("returnBook").innerHTML=`<img src="${it.cover}"><div><b>${escapeHtml(it.title)}</b><span>Order ${o.id}</span></div>`;openModal("returnModal")}
window.openReturn=openReturn;
function submitReturn(e){e.preventDefault();const o=getOrders();const ctx=window.returnContext;if(!ctx||!o[ctx.oi])return;const {oi,ii}=ctx;const type=document.getElementById("returnType").value;const reason=document.getElementById("returnReason").value;const note=document.getElementById("returnNote").value.trim();o[oi].items[ii].returnStatus=type+" requested";o[oi].items[ii].returnReason=reason;o[oi].items[ii].returnNote=note;o[oi].items[ii].returnDate=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});o[oi].status="Return request submitted";saveOrders(o);closeModal("returnModal");openOrdersModal();showToast("Return request submitted successfully")}
window.submitReturn=submitReturn;

async function processCheckout(e){e.preventDefault();if(!getUser()){location.href="index.html?login=1&return=cart";return}const c=getCart();if(!c.length){showToast("Your cart is empty");return}const total=c.reduce((s,i)=>s+i.price*i.qty,0);let result={orderId:"ORD-"+Math.floor(100000+Math.random()*900000),total};try{const r=await fetch(`${API}/checkout`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:c.map(i=>({id:i.id,qty:i.qty}))})});if(r.ok)result=await r.json()}catch(err){}
 const date=new Date();const delivery=new Date(date.getTime()+4*86400000);const order={id:String(result.orderId),userEmail:getUser().email,date:date.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),delivery:delivery.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),total,items:c,status:"Confirmed"};const os=getOrders();os.unshift(order);saveOrders(os);localStorage.removeItem("booknest_cart");document.getElementById("successOrderId").textContent=order.id;document.getElementById("successDelivery").textContent=order.delivery;closeModal("checkoutModal");updateCartCount();renderCart();openModal("successModal")}
window.processCheckout=processCheckout;
function openCheckoutModal(){if(!getUser()){location.href="index.html?login=1&return=cart";return}if(!getCart().length){showToast("Your cart is empty");return}const e=document.getElementById("checkoutTotal");if(e)e.textContent="₹"+getCart().reduce((s,i)=>s+i.price*i.qty,0);const u=getUser();if(u&&document.getElementById("custName"))document.getElementById("custName").value=u.name;openModal("checkoutModal")}
window.openCheckoutModal=openCheckoutModal;

function renderCart(){const list=document.getElementById("cartItems");if(!list)return;const c=getCart(),empty=document.getElementById("cartEmptyMsg"),sum=document.getElementById("cartSummary");empty.classList.toggle("hidden",c.length>0);sum.classList.toggle("hidden",!c.length);list.innerHTML=c.map(i=>`<div class="cart-item"><img src="${i.cover}" alt=""><div class="cart-item-info"><h3>${escapeHtml(i.title)}</h3><p>${escapeHtml(i.author||"BookNest")}</p><strong>₹${i.price}</strong></div><div class="qty-controls"><button onclick="changeQty(${i.id},-1)">−</button><b>${i.qty}</b><button onclick="changeQty(${i.id},1)">+</button></div><button class="remove" onclick="removeItem(${i.id})">Remove</button></div>`).join("");const total=c.reduce((s,i)=>s+i.price*i.qty,0);const a=document.getElementById("cartTotal"),b=document.getElementById("cartGrandTotal");if(a)a.textContent="₹"+total;if(b)b.textContent="₹"+total;updateCartCount()}
function changeQty(id,d){const c=getCart(),i=c.find(x=>x.id===id);if(i){i.qty+=d;if(i.qty<1)return removeItem(id)}saveCart(c);renderCart()}
function removeItem(id){saveCart(getCart().filter(i=>i.id!==id));renderCart();showToast("Item removed")}
window.changeQty=changeQty;window.removeItem=removeItem;

document.addEventListener("DOMContentLoaded",()=>{updateCartCount();updateLikeCount();updateAccountUI();initStorefront();renderCart();if(new URLSearchParams(location.search).get("login")==="1"&&!getUser())setTimeout(openAuthModal,150)});

async function initAdminPage(){
 const tb=document.getElementById("adminTableBody");if(!tb)return;
 const form=document.getElementById("bookForm"),id=document.getElementById("bookId"),submit=document.getElementById("submitBtn"),cancel=document.getElementById("cancelEditBtn");
 async function load(){try{const r=await fetch(`${API}/books`);const books=await r.json();tb.innerHTML=books.map(b=>`<tr><td>${escapeHtml(b.title)}</td><td>${escapeHtml(b.author)}</td><td>${escapeHtml(b.category)}</td><td>₹${b.price}</td><td>${b.stock}</td><td><button class="btn ghost" onclick='editBook(${JSON.stringify(b).replace(/'/g,"&#39;")})'>Edit</button> <button class="btn danger" onclick="deleteAdminBook(${b.id})">Delete</button></td></tr>`).join("")}catch(e){tb.innerHTML="<tr><td colspan='6'>Start the Node server to manage books.</td></tr>"}}
 window.editBook=b=>{id.value=b.id;document.getElementById("title").value=b.title;document.getElementById("author").value=b.author;document.getElementById("category").value=b.category;document.getElementById("price").value=b.price;document.getElementById("stock").value=b.stock;document.getElementById("cover").value=b.cover;document.getElementById("description").value=b.description||"";submit.textContent="Update Book";cancel.classList.remove("hidden")};
 window.deleteAdminBook=async x=>{if(!confirm("Delete this book?"))return;await fetch(`${API}/books/${x}`,{method:"DELETE"});showToast("Book deleted");load()};
 cancel.onclick=()=>{form.reset();id.value="";submit.textContent="Add Book";cancel.classList.add("hidden")};
 form.onsubmit=async e=>{e.preventDefault();const p={title:title.value,author:author.value,category:category.value,price:Number(price.value),stock:Number(stock.value),cover:cover.value,description:description.value};const r=await fetch(id.value?`${API}/books/${id.value}`:`${API}/books`,{method:id.value?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});if(r.ok){showToast("Book saved");cancel.click();load()}};
 load();
}
document.addEventListener("DOMContentLoaded",initAdminPage);
