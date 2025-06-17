import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CV } from '@/app/cv-preview/page';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
        color: '#1e1b4b', // text-gray-900
    },
    section: {
        marginBottom: 2,
        paddingBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4338ca', // text-indigo-700
        textAlign: 'center',
        marginBottom: 6,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4f46e5', // text-indigo-600
        marginBottom: 4,
        marginTop: 12,
    },
    text: {
        marginBottom: 3,
        color: '#374151',
    },
    headerText: {
        marginBottom: 3,
        color: '#374151',
        textAlign: 'center'
    },
    bullet: {
        marginLeft: 10,
        color: '#4338ca',
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5db', // border-gray-300
        marginVertical: 4,
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
    },
});

type Experience = CV['experience'][number];
type Education = CV['education'][number];

export function CVDocument({ data }: { data: CV }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>{data.header.fullName}</Text>
                    <Text style={styles.headerText} >
                        {data.header.location} • {data.header.email} • {data.header.phone}
                    </Text>
                    <Text style={[styles.headerText, { color: '#4f46e5' }]}>
                        {data.header.linkedin}
                    </Text>
                </View>

                <View style={styles.line} />

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Summary</Text>
                    <Text style={styles.text}>{data.summary}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Professional Experience</Text>
                    <View style={styles.line} />
                    {data.experience.map((job: Experience, i) => (
                        <View key={i} style={{ marginBottom: 8 }}>
                            <View style={styles.flexContainer}>
                                <Text style={{ fontWeight: 'bold', color: '#1e1b4b' }}>{job.jobTitle}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#1e1b4b' }}>{job.employer}</Text>
                            </View>
                            <View style={styles.flexContainer}>
                                <Text style={{ color: '#6b7280' }}>{job.location}</Text>
                                <Text style={{ fontStyle: 'italic', color: '#6b7280' }}>
                                    {dayjs(job.startDate).format('MMMM D, YYYY')} – {job.endDate ? dayjs(job.endDate).format('MMMM D, YYYY') : 'Present'}
                                </Text>
                            </View>
                            {job.bullets.map((b: string, j: number) => (
                                <Text key={j} style={styles.text}>
                                    <Text style={styles.bullet}>• </Text>{b}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Education</Text>
                    <View style={styles.line} />
                    {data.education.map((edu: Education, i) => (
                        <View key={i} style={{ marginBottom: 6 }}>
                            <View style={styles.section}>
                                <View style={styles.flexContainer}>
                                    <Text style={{ fontWeight: 'bold', color: '#1e1b4b' }}>{edu.degree}</Text>
                                    <Text style={{ fontWeight: 'bold', color: '#1e1b4b' }}>{edu.institution}</Text>
                                </View>
                                <Text style={{ fontStyle: 'italic', color: '#6b7280' }}>{dayjs(edu.startDate).format('MMMM D, YYYY') + " – " + dayjs(edu.graduationDate).format('MMMM D, YYYY')}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.subHeader}>Skills</Text>
                    <View style={styles.line} />
                    <Text style={styles.text}>
                        <Text style={{ fontWeight: 'bold' }}>Languages:</Text> {data.skills.languages.join(', ')}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={{ fontWeight: 'bold' }}>Technical:</Text> {data.skills.technical.join(', ')}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={{ fontWeight: 'bold' }}>Soft Skills:</Text> {data.skills.softSkills.join(', ')}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
