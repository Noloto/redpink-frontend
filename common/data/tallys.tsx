import {
  TbTallymark1,
  TbTallymark2,
  TbTallymark3,
  TbTallymark4,
  TbTallymarks,
} from 'react-icons/tb';

const tallys = [
  <TbTallymark1 size={38} key={1} />,
  <TbTallymark2 size={38} key={2} />,
  <TbTallymark3 size={38} key={3} />,
  <TbTallymark4 size={38} key={4} />,
  <TbTallymarks size={38} key={5} />,
  <>
    <TbTallymarks size={38} key={5} />
    <TbTallymark1 size={38} key={5} />
  </>,
  <>
    <TbTallymarks size={38} key={6} />
    <TbTallymark2 size={38} key={7} />
  </>,
  <>
    <TbTallymarks size={38} key={8} />
    <TbTallymark3 size={38} key={9} />
  </>,
  <>
    <TbTallymarks size={38} key={10} />
    <TbTallymark4 size={38} key={11} />
  </>,
  <>
    <TbTallymarks size={38} key={12} />
    <TbTallymarks size={38} key={13} />
  </>,
];

export { tallys };
