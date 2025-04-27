// // app/job/[id]/proposals/page.tsx (example file path)

// import { getProposalsForJob } from '@/server/functions/proposal';
// import { redirect } from 'next/navigation';

// interface ProposalsPageProps {
//   params: { id: string };
//   searchParams: { offset?: string; limit?: string };
// }

// export default async function ProposalsPage({ params, searchParams }: ProposalsPageProps) {
//   const { id } = params;
//   const offset = parseInt(searchParams.offset || '0', 10);
//   const limit = parseInt(searchParams.limit || '8', 10);

//   if (!id) {
//     redirect('/'); // redirect to home if no id found
//   }

//   // Fake fetching proposals (replace this with actual db call)
//   const proposals = await getProposalsForJob(id, offset, limit);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Proposals for Job {id}</h1>

//       <div>
//         <h3 className="text-xl font-semibold mb-4">Proposals</h3>

//         {/* Render fetched proposals */}
//         {proposals.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {proposals.map((proposal) => (
//               <div
//                 key={proposal.id}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
//               >
//                 <h4 className="text-lg font-semibold text-blue-600">{proposal?.title}</h4>
//                 <p className="text-gray-700 mt-2">{proposal.description}</p>
//                 <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   View Profile
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-red-500">No proposals found for this job.</p>
//         )}
//       </div>

//       {/* Simple Pagination */}
//       <div className="flex justify-center gap-4 mt-10">
//         {offset > 0 && (
//           <a
//             href={`?offset=${Math.max(offset - limit, 0)}&limit=${limit}`}
//             className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Previous
//           </a>
//         )}
//         {proposals.length === limit && (
//           <a
//             href={`?offset=${offset + limit}&limit=${limit}`}
//             className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Next
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }
