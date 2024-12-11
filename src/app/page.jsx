import {
  readFile,
  getInitialListOfHeaders,
} from "@/app/actions/third-party-api/actions";
import Home from "@/app/components/Home";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await readFile();
  const initialListOfHeaders = await getInitialListOfHeaders();
  return <Home initialListOfHeaders={initialListOfHeaders} data={data} />;
}
