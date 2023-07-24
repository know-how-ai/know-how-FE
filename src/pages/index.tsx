import Layout from "../layout/Layout";
import dynamic from "next/dynamic";
import { Anchor, Button } from "@components/atoms";
import { useRouter } from "next/router";
import ToggleButton from "@components/molecules/toggleButton/ToggleButton";
import { useState } from "react";
import { LoginOrJoinForm } from "@components/organics";

const Editor = dynamic(() => import("@components/atoms/editor"), {
    ssr: false,
});
const DraftViewer = dynamic(() => import("@components/atoms/draftViewer"), {
    ssr: false,
});

export default function Home() {
    const { push } = useRouter();

    const [toggle, setToggle] = useState(true);

    // const onClick = () => {
    //     push("/example");
    // };

    return (
        <Layout title="HOME">
            {/* <ToggleButton
                statement={toggle}
                onClick={() => setToggle((prev) => !prev)}
            /> */}

            <LoginOrJoinForm />

            <Button>
                <Anchor href={"/example"}>Go to Example</Anchor>
            </Button>
            {/* <Editor
                defaultState={`<pre>const editorToHtml = 
        draftToHtml(convertToRaw(editorState.getCurrentContent()));</pre>
        <p style="text-align:center;"><strong>ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
        </strong></p>`}
            />
            <DraftViewer draft={""} /> */}
        </Layout>
    );
}
