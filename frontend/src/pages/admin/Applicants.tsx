import ApplicantsTable from "@/components/admin/applicants-table";
import useGetAllApplicants from "@/hooks/useGetAllApplicant";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useParams } from "react-router-dom";

type Props = {};

export default function Applicants({}: Props) {
  const { _id } = useParams<{ _id: string | undefined }>();
  useGetAllApplicants({ _id: _id as string });
  const { allApplicants } = useAppSelector((state) => state.applicants);
  return (
    <div className="mx-auto max-w-7xl p-5">
      <h1 className="my-5 text-xl font-bold">
        Total Applicants apply for this job {`${allApplicants.length}`}
      </h1>
      <p>List of applicants will be displayed here.</p>
      <ApplicantsTable />
    </div>
  );
}
