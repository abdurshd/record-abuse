export default function PrettyJSON({ children: object }) {
  return <pre>{JSON.stringify(object, null, 2)}</pre>;
}