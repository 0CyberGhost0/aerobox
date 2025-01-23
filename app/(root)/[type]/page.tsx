import Card from '@/components/ui/Card';
import Sort from '@/components/Sort';
import { getFiles } from '@/lib/actions/file.actions';
import { Models } from 'node-appwrite';
import React from 'react'

const Page =async  ({params}:SearchParamProps) => {
    const type=((await params)?.type as string) || '';
    const files = await getFiles({ types: [], searchText: "", sort: "$createdAt-desc", limit: 10 });
  return (
    <div className='page-container'>
        <section className='w-full'>
            <h1 className='h1 capitalize'>{type}</h1>
            <div className='total-size-section'>
                <p className='body-1'>
                    Total:<span className='h5'>10 MB</span>
                </p>
                <div className='sort-container'>
                    <p className='body-1 hidden text-light-200 sm:block'>
                        Sort By:
                    </p>
                    <Sort/>

                </div>
            </div>

        </section>
        {files.total > 0 ? (
            <section className='file-list'>
                {files.documents.map((file: Models.Document) => (
                    <Card key={file.$id} file={file}/>
                ))}

            </section>
        ):<p className='empty-list'>No Files Uploaded</p>}

    </div>
  )
}
 
export default Page