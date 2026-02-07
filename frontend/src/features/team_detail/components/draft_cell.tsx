import { draftType } from '../../../components/utils';

export const DraftCell = ({ row }: any) => {
  if (!row.draft_year) return <>-</>;

  return (
    <>
      {row.draft_year}年 {row.draft_rank}位 {draftType(row.draft_type)}
    </>
  );
};

export default DraftCell;
