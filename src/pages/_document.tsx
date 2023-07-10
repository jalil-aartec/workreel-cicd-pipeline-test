import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang={'en'}>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="shortcut icon" href="/assets/favicon.ico" />
                    <meta
                        httpEquiv={'Content-Type'}
                        content={'text/html'}
                        charSet={'UTF-8'}
                    />
                    <meta httpEquiv={'X-UA-Compatible'} content={'ie=edge'} />
                </Head>
                <NextScript />
                <body className="font-poppins antialiased bg-white text-gray-900 dark:text-gray-100 tracking-tight">
                    <Main />
                </body>
            </Html>
        )
    }
}

export default MyDocument
