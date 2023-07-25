import { LabelWrapper } from "@components/molecules";
import Layout from "../layout/Layout";
import { Anchor, Button, Select } from "@components/atoms";

export default function Home() {
    return (
        <Layout title="Home">
            {/* 조건부: 로그인 안되어있을때만. */}
            <Anchor href={"/sign"}>
                <Button>로그인하기</Button>
            </Anchor>
            <Anchor href={"/example"}>
                <Button>Go to Example</Button>
            </Anchor>
        </Layout>
    );
}
