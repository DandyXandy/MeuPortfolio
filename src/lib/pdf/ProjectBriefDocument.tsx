import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';

// Estrutura já "traduzida" — a rota da API resolve os textos (via
// next-intl/server) antes de montar esse objeto, então este arquivo
// só cuida do layout do PDF, sem depender de i18n diretamente.
export type BriefSection = {
  title: string;
  rows: { label: string; value: string }[];
};

export type BriefData = {
  heading: string;
  projectTypeTitle: string;
  submittedAt: string;
  clientName: string;
  sections: BriefSection[];
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#111111',
  },
  header: {
    marginBottom: 24,
    borderBottom: '2px solid #8B5CF6',
    paddingBottom: 16,
  },
  brand: {
    fontSize: 12,
    color: '#8B5CF6',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  meta: {
    fontSize: 9,
    color: '#666666',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#8B5CF6',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 160,
    color: '#666666',
  },
  value: {
    flex: 1,
    fontFamily: 'Helvetica-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#999999',
    textAlign: 'center',
    borderTop: '1px solid #eeeeee',
    paddingTop: 10,
  },
});

export default function ProjectBriefDocument({ data }: { data: BriefData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>DANDY.DEV — SOLICITAR PROJETO</Text>
          <Text style={styles.title}>{data.heading}</Text>
          <Text style={styles.meta}>
            {data.clientName} · {data.projectTypeTitle} · {data.submittedAt}
          </Text>
        </View>

        {data.sections.map((section) => (
          <View key={section.title} style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.rows.map((row) => (
              <View key={row.label} style={styles.row}>
                <Text style={styles.label}>{row.label}</Text>
                <Text style={styles.value}>{row.value}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>
          Gerado automaticamente pelo formulário "Solicitar Projeto" — dandyabadie.dev
        </Text>
      </Page>
    </Document>
  );
}
