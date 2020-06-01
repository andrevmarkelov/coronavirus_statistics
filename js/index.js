window.onload = () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    class News {
        constructor(data = {}) {
            let { confirmed, recovered, deaths } = data;
            this.confirmed = confirmed;
            this.recovered = recovered;
            this.deaths = deaths;
        }
    }

    class PrintNews {
        constructor(data) {
            this.data = data;
        }

        html() {
            return `<div class = "coronaInfo">
                <h1>Статистика вирусной болезни коронавируса</h1>
                <h2 class="confirmed">Подтвержденные случаи коронавируса: <span style="color: #5fe60e;">${this.data.confirmed}</span></h2>
                <ul class="coronaStat">
                    <li>Все случаи: ${this.data.confirmed}</li>
                    <li>Извлеченные случаи: ${this.data.recovered}</li>
                    <li>Смертей: ${this.data.deaths}</li>
                </ul>
            </div>`;
        }
    }

    fetch('https://covid19.mathdro.id/api', requestOptions)
        .then(response => response.json())
        .then(result => {
            let obj = {};
            for(let i in result) {
                if (result[i].value) obj[i] = result[i].value;
            }

            let news = new News(obj);
            let print = new PrintNews(news);
            document.querySelector('#root').insertAdjacentHTML('afterbegin', print.html());
        })
        .then(err => err ? console.log(err) : '');
};