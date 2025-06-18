"use client"
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CVDocument } from './cvDocument';
import { CV } from '../CVPreview/CVPreview';

export function DownloadResumeButton({ cvData }: { cvData: CV }) {
    const document = React.useMemo(() => <CVDocument data={cvData} />, [cvData]);

    return (
        <PDFDownloadLink document={document} fileName="resume.pdf" style={{ textDecoration: 'none' }}>
            {({ loading }) => (
                <button
                    type="button" 
                    className="border-2 border-solid border-indigo-600 rounded-full overflow-hidden duration-200 hover:opacity-70 hover:scale-95 cursor-pointer"
                    disabled={loading}
                >
                    <p className='font-fugaz px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 text-indigo-600'>{loading ? 'Generating PDF...' : 'Download PDF'}</p>

                </button>
            )}
        </PDFDownloadLink>
    );
}
