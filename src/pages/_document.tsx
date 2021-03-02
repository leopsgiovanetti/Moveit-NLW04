import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

    render() {
        return (

            <Html>

                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
                        rel="stylesheet" />
                    <link rel="shortcut icon" href="favicon.png" type="image/png" />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>

            </Html>
        )
    }
}
/* Esse arquivo é carregado uma unica vez, por isso as fontes e
outros headers que precisem em varias paginas devem  ficar aqui*/