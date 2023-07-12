import Head from "next/head";
import Layout from "../layout/Layout";
import dynamic from "next/dynamic";
import { Button } from "@components/atoms";
import { useRouter } from "next/router";

const Editor = dynamic(() => import("@components/atoms/editor"), {
    ssr: false,
});

export default function Home() {
    const { push } = useRouter();

    const onClick = () => {
        push("/example");
    };

    return (
        <>
            <Head>
                <title>Blog-ify</title>
                <meta name="description" content="Your next blog." />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout title="HOME">
                <Button onClick={onClick}>Example</Button>
                <Editor
                    defaultState={`<pre>const editorToHtml = 
        draftToHtml(convertToRaw(editorState.getCurrentContent()));</pre>
        <p style="text-align:center;"><strong>ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
        </strong></p>`}
                />
            </Layout>
        </>
    );
}
