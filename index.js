const Wanttoread_AR = []
const Reading_AR = []
const Pausedreading_AR = []
const Read_AR = []
const Quitreading_AR = []

class addedtocollectionObject {

  constructor(nume, autor, imagine) {
    this.nume = nume,
      this.autor = autor,
      this.imagine = imagine
  }
}

async function searchingbooks() {
  const booksearch_input = document.getElementById("booksearch_input").value.toLocaleLowerCase();

  try {
    const searchURL = await fetch(`https://openlibrary.org/search.json?title=${booksearch_input}`);

    // Check if the response is ok (status code in the range 200-299)
    if (!searchURL.ok) {
      throw new Error(`HTTP error! status: ${searchURL.status}`);
    }

    const datasearch = await searchURL.json();
    console.log(datasearch);

    const booklist = document.getElementById("searchresultssection");

    if (datasearch.docs) {
      booklist.innerHTML = '';

      datasearch.docs.forEach((book) => {
        const UniqueID = book.cover_edition_key ? book.cover_edition_key : 'No title available';
        const bookTitle = book.title ? book.title : 'No title available';
        const bookimg = book.cover_i ? book.cover_i : 'No title available';
        const bookauthor = book.author_name ? book.author_name.join(", ") : 'Unknown';
        const numberofpages = book.number_of_pages_median ? book.number_of_pages_median : 'N/A';
        const booklanguage = book.language ? book.language.join(", ") : 'N/A';
        const ratings_average = book.ratings_average ? book.ratings_average : 'N/A';
        const ratings_count = book.ratings_count ? book.ratings_count : 'N/A';

        booklist.innerHTML += `
                    <div class="d-flex flex-row p-md-4 m-4 rounded-4 justify-content-center">
                        <a href="/YourBookshelf-main/YourBookshelf-main/HTML/singleproduct.html" >
                                        <div class="col">
              <div class="card border-0 bck-light-shades book-link" data-id="${UniqueID}" onclick="singleproductdisplay('${UniqueID}')">
                <img src="https://covers.openlibrary.org/b/id/${bookimg}-M.jpg" class="rounded-4 me-3 m-2 shadow-lg">
                <div>
                    <div class="mx-1 my-1 mb-3">
                        <h1 class="fw-bolder m-0" data-id="${bookTitle}">${bookTitle}</h1>
                        <h3 class="fst-italic">Written by: <strong> ${bookauthor} </strong> </h3>
                    </div>
                    <p class="fw-light m-0">NR. of pages: <strong> ${numberofpages} </strong> </p>
                    <p class="fw-light">Language: ${booklanguage}</p>
                    <h4>Rating: <strong>${ratings_average} stars</strong> <italic> (${ratings_count}) </italic> </h4>
                </div>
              </div>
            </div>
                        </a>
                    </div>    
                `;

        document.querySelectorAll('.book-link').forEach(item => {
          item.addEventListener('click', (event) => {
            event.preventDefault();
            const bookID = item.getAttribute('data-id');
            singleproductdisplay(bookID);
          });
        });
      });
    } else {
      booklist.innerHTML = '<h2>No results found</h2>';
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function singleproductdisplay(bookID) {
  const overlayonmain = document.getElementById("singularbookoverlay");

  try {
    const searchforID = await fetch(`https://openlibrary.org/search.json?q=${bookID}`);

    if (!searchforID.ok) {
      throw new Error(`HTTP error! status: ${searchforID.status}`);
    }

    const datasearch = await searchforID.json();
    console.log(datasearch.docs[0]);

    if (datasearch.docs[0]) {
      const property = datasearch.docs[0];
      const bookTitle = property.title;
      const bookauthor = property.author_name;
      const wanttoread = property.want_to_read_count;
      const haveread = property.readinglog_count;
      const firstpublished = property.first_publish_year;
      const publisher = property.publisher[0];
      const language = property.language;
      const numberofpages = property.number_of_pages_median;
      const ratings_average = Math.round(property.ratings_average);
      const ratings_count = property.ratings_count;
      const bookIMG = property.cover_i;
      const firstsentence = property.first_sentence;


      if (!ratings_average) {
        overlayonmain.innerHTML = `
                <div>
                    <div class="mx-3 py-2 d-flex flex-wrap justify-content-evenly" id="afteroverlay" >
                        <img class="d-block mx-1 mb-4 object-fit-contain w-25 h-50   rounded-4" src="https://covers.openlibrary.org/b/id/${bookIMG}-M.jpg" alt="" width="72" height="57">
                        <div class="col-lg-6 mx-1 flex-column ">
                            <h1 class="display-5 fw-bold text-body-emphasis text-center">${bookTitle}</h1>
                            <p class="fst-italic">Written by: '${bookauthor}'</p>
                            <hr>
                            <blockquote cite="" class="fst-italic">${firstsentence}</blockquote>
                            <hr>
                            <p>This book was written by ${bookauthor} and first published in ${firstpublished} by ${publisher}. So far, it was written/translated in ${language}.
                            <div>
                                <p>Already read by: ${haveread}</p>
                                <p>Marked as want to read by: ${wanttoread}</p>
                                <p>NR. of pages: ${numberofpages}</p>
                            </div>
                            <p>Rating: No Reviews</p>
                            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button type="button" class="btn btn-primary btn-lg px-4 gap-3" onclick="addtocollection(${bookTitle})" id='addtocollectionbutton'>Add to Collection</button>
                                <button type="button" class="btn btn-outline-secondary btn-lg px-4">Review</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-5">
            `;
      } else if (!firstsentence) {
        overlayonmain.innerHTML = `
                <div>
                    <div class="mx-3 py-2 d-flex flex-wrap justify-content-evenly" id="afteroverlay">
                        <img class="d-block mx-1 mb-4 object-fit-contain w-25 h-50   rounded-4" src="https://covers.openlibrary.org/b/id/${bookIMG}-M.jpg" alt="" width="72" height="57">
                        <div class="col-lg-6 mx-1 flex-column ">
                            <h1 class="display-5 fw-bold text-body-emphasis text-center">${bookTitle}</h1>
                            <p class="fst-italic">Written by: '${bookauthor}'</p>
                            <hr>
                            <p>This book was written by ${bookauthor} and first published in ${firstpublished} by ${publisher}. So far, it was written/translated in ${language}.
                            <div>
                                <p>Already read by: ${haveread}</p>
                                <p>Marked as want to read by: ${wanttoread}</p>
                                <p>NR. of pages: ${numberofpages}</p>
                            </div>
                            <p>Rating: ${ratings_average} (${ratings_count})</p>
                            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button type="button" class="btn btn-primary btn-lg px-4 gap-3" onclick="addtocollection(${bookTitle})" id='addtocollectionbutton'>Add to Collection</button>
                                <button type="button" class="btn btn-outline-secondary btn-lg px-4">Review</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-5">
            `;
      }

      else {
        overlayonmain.innerHTML = `
                <div>
                    <div class="mx-3 py-2 d-flex flex-wrap justify-content-evenly" id="afteroverlay">
                        <img class="d-block mx-1 mb-4 object-fit-contain w-25 h-50   rounded-4" src="https://covers.openlibrary.org/b/id/${bookIMG}-M.jpg" alt="" width="72" height="57">
                        <div class="col-lg-6 mx-1 flex-column ">
                            <h1 class="display-5 fw-bold text-body-emphasis text-center">${bookTitle}</h1>
                            <p class="fst-italic">Written by: '${bookauthor}'</p>
                            <hr>
                            <blockquote cite="" class="fst-italic">${firstsentence}</blockquote>
                            <hr>
                            <p>This book was written by ${bookauthor} and first published in ${firstpublished} by ${publisher}. So far, it was written/translated in ${language}.
                            <div>
                                <p>Already read by: ${haveread}</p>
                                <p>Marked as want to read by: ${wanttoread}</p>
                                <p>NR. of pages: ${numberofpages}</p>
                            </div>
                            <p>Rating: ${ratings_average} (${ratings_count})</p>
                            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <button type="button" class="btn btn-primary btn-lg px-4 gap-3" onclick="addtocollection()" id='addtocollectionbutton'>Add to Collection</button>
                                <button type="button" class="btn btn-outline-secondary btn-lg px-4">Review</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-5">

            `;
      }

      document.getElementById('addtocollectionbutton').onclick = function () {
        addtocollection(bookTitle, bookauthor, bookIMG);
      }
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function addtocollection(bookTitle, bookauthor, bookIMG) {
  const overlayonmain = document.getElementById("singularbookoverlay");
  const afteroverlay = document.getElementById("afteroverlay");
  afteroverlay.style.opacity = "0.1"
  overlayonmain.innerHTML += `
<nav class="bck-dark-accent  h-75 w-75 rounded-3" style="position: fixed; top:10%; left:10%; right:10%; bottom:10%;">
  <div class="container-fluid">
    <div>
          <h1 class="light-shades text-center">Add to collection</h1>
          <button class="bck-dark-accent border-0 light-shades w-100" id="wanttoread">
                  <div class="py-3 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <h3 class="px-2">Want to read</h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="var( --light-shades)"
            class="bi bi-arrow-right-square"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </div>
          </button>
          <button class="bck-dark-accent border-0 light-shades w-100" id="reading">
                  <div class="py-3 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <h3 class="px-2">Reading</h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="var( --light-shades)"
            class="bi bi-arrow-right-square"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </div>
          </button>
          <button class="bck-dark-accent border-0 light-shades w-100" id="pausedreading">
                  <div class="py-3 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <h3 class="px-2">Paused Reading</h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="var( --light-shades)"
            class="bi bi-arrow-right-square"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </div>
          </button>
          <button class="bck-dark-accent border-0 light-shades w-100" id="read">
                  <div class="py-3 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <h3 class="px-2">Read</h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="var( --light-shades)"
            class="bi bi-arrow-right-square"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </div>
          </button>
          <button class="bck-dark-accent border-0 light-shades w-100" id="quitreading">
                  <div class="py-3 d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <h3 class="px-2">Quit Read</h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="var( --light-shades)"
            class="bi bi-arrow-right-square"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
            />
          </svg>
        </div>
          </button>
    </div>
  </div>
</nav>
    
`;

  const newbook = new addedtocollectionObject(bookTitle, bookauthor, bookIMG)

  document.getElementById('wanttoread').onclick = function () {
    Wanttoread_AR.push(newbook)
    console.log(Wanttoread_AR)
  }
  document.getElementById('reading').onclick = function () {
    Reading_AR.push(newbook)
    console.log(Reading_AR)
  }
  document.getElementById('pausedreading').onclick = function () {
    Pausedreading_AR.push(newbook)
    console.log(Pausedreading_AR)
  }
  document.getElementById('read').onclick = function () {
    Read_AR.push(newbook)
    console.log(Read_AR)
  }
  document.getElementById('quitreading').onclick = function () {
    Quitreading_AR.push(newbook)
    console.log(Quitreading_AR)
  }
}

function displaybooksinplaylist() {
  if (Wanttoread_AR.length === 0) {
    document.getElementById('wanttoreadplaylist').innerHTML = `
        <p>No books added yet</p>
      `
  } else {
    Wanttoread_AR.forEach((item) => {
      const bookimg = item.bookIMG;
      const bookTitle = item.bookTitle;
      const bookauthor = item.bookauthor;

      document.getElementById('wanttoreadplaylist').innerHTML += `
        <div class="col">
    <div class="card border-0 bck-light-shades">
      <img src="https://covers.openlibrary.org/b/id/${bookimg}-M.jpg" class="rounded-4 me-3 m-2 shadow-lg">
      <div>
          <div class="mx-1 my-1 mb-3">
              <h1 class="fw-bolder m-0">${bookTitle}</h1>
              <h3 class="fst-italic">Written by: <strong> ${bookauthor} </strong> </h3>
          </div>
      </div>
    </div>
  </div>
`
    })
  }
}

displaybooksinplaylist()