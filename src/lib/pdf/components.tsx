"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { commonStyles, colors } from "./styles";

// Cover Page Component
interface CoverPageProps {
  badge?: string;
  title: string;
  subtitle?: string;
  creatorName?: string;
  date?: string;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  badge = "CREATOR DNA",
  title,
  subtitle,
  creatorName,
  date,
}) => (
  <Page size="A4" style={commonStyles.coverPage}>
    <View style={commonStyles.coverBadge}>
      <Text style={commonStyles.coverBadgeText}>{badge}</Text>
    </View>
    <Text style={commonStyles.coverTitle}>{title}</Text>
    {subtitle && <Text style={commonStyles.coverSubtitle}>{subtitle}</Text>}
    <View style={commonStyles.coverDivider} />
    {creatorName && (
      <Text style={commonStyles.coverMeta}>Prepared for: {creatorName}</Text>
    )}
    {date && (
      <Text style={[commonStyles.coverMeta, { marginTop: 5 }]}>{date}</Text>
    )}
  </Page>
);

// Section Header Component
interface SectionHeaderProps {
  number: string;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
}) => (
  <View style={{ marginTop: 25, marginBottom: 15 }}>
    <Text style={commonStyles.sectionNumber}>{number}</Text>
    <Text style={commonStyles.sectionTitle}>{title}</Text>
    <View style={commonStyles.sectionUnderline} />
  </View>
);

// Table Component
interface TableProps {
  headers: string[];
  rows: string[][];
  columnWidths?: number[];
}

export const Table: React.FC<TableProps> = ({ headers, rows, columnWidths }) => {
  const defaultWidth = 100 / headers.length;
  const widths = columnWidths || headers.map(() => defaultWidth);

  return (
    <View style={commonStyles.table}>
      <View style={commonStyles.tableHeader}>
        {headers.map((header, i) => (
          <Text
            key={i}
            style={[commonStyles.tableHeaderCell, { width: `${widths[i]}%` }]}
          >
            {header}
          </Text>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            commonStyles.tableRow,
            rowIndex % 2 === 0
              ? commonStyles.tableRowEven
              : commonStyles.tableRowOdd,
          ]}
        >
          {row.map((cell, cellIndex) => (
            <Text
              key={cellIndex}
              style={[commonStyles.tableCell, { width: `${widths[cellIndex]}%` }]}
            >
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

// Bullet List Component
interface BulletListProps {
  items: string[];
  bulletChar?: string;
}

export const BulletList: React.FC<BulletListProps> = ({
  items,
  bulletChar = "•",
}) => (
  <View style={commonStyles.bulletList}>
    {items.map((item, i) => (
      <View key={i} style={commonStyles.bulletItem}>
        <Text style={commonStyles.bulletPoint}>{bulletChar}</Text>
        <Text style={commonStyles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

// Checklist Component
interface ChecklistProps {
  items: { text: string; checked: boolean }[];
}

export const Checklist: React.FC<ChecklistProps> = ({ items }) => (
  <View style={commonStyles.bulletList}>
    {items.map((item, i) => (
      <View key={i} style={commonStyles.checkItem}>
        <Text style={item.checked ? commonStyles.checkMark : commonStyles.crossMark}>
          {item.checked ? "✓" : "✗"}
        </Text>
        <Text style={commonStyles.checkText}>{item.text}</Text>
      </View>
    ))}
  </View>
);

// Highlight Box Component
interface HighlightBoxProps {
  children: React.ReactNode;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({ children }) => (
  <View style={commonStyles.highlightBox}>
    <Text style={commonStyles.highlightText}>{children}</Text>
  </View>
);

// Quote Box Component
interface QuoteBoxProps {
  quote: string;
  author?: string;
}

export const QuoteBox: React.FC<QuoteBoxProps> = ({ quote, author }) => (
  <View style={commonStyles.quoteBox}>
    <Text style={commonStyles.quoteText}>"{quote}"</Text>
    {author && <Text style={commonStyles.quoteAuthor}>— {author}</Text>}
  </View>
);

// Card Component
interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => (
  <View style={commonStyles.card}>
    <Text style={commonStyles.cardTitle}>{title}</Text>
    <Text style={commonStyles.cardContent}>{children}</Text>
  </View>
);

// Metrics Row Component
interface MetricBoxData {
  value: string;
  label: string;
}

interface MetricsRowProps {
  metrics: MetricBoxData[];
}

export const MetricsRow: React.FC<MetricsRowProps> = ({ metrics }) => (
  <View style={commonStyles.metricRow}>
    {metrics.map((metric, i) => (
      <View key={i} style={commonStyles.metricBox}>
        <Text style={commonStyles.metricValue}>{metric.value}</Text>
        <Text style={commonStyles.metricLabel}>{metric.label}</Text>
      </View>
    ))}
  </View>
);

// Score Display Component
interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  label: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  maxScore = 50,
  label,
}) => (
  <View style={commonStyles.scoreContainer}>
    <View style={commonStyles.scoreCircle}>
      <Text style={commonStyles.scoreValue}>
        {score}/{maxScore}
      </Text>
    </View>
    <Text style={commonStyles.scoreLabel}>{label}</Text>
  </View>
);

// Day Header for 14-Day Launch
interface DayHeaderProps {
  dayNumber: number;
  title: string;
  phase: string;
}

export const DayHeader: React.FC<DayHeaderProps> = ({
  dayNumber,
  title,
  phase,
}) => (
  <View style={commonStyles.dayHeader}>
    <Text style={commonStyles.dayNumber}>DAY {String(dayNumber).padStart(2, "0")}</Text>
    <Text style={commonStyles.dayTitle}>{title}</Text>
    <View style={commonStyles.phaseTag}>
      <Text style={commonStyles.phaseTagText}>{phase}</Text>
    </View>
  </View>
);

// Footer Component
interface FooterProps {
  documentTitle: string;
  pageNumber?: number;
}

export const Footer: React.FC<FooterProps> = ({ documentTitle }) => (
  <View style={commonStyles.footer} fixed>
    <Text style={commonStyles.footerText}>{documentTitle}</Text>
    <Text
      style={commonStyles.pageNumber}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);

// Content Page wrapper
interface ContentPageProps {
  children: React.ReactNode;
  documentTitle?: string;
}

export const ContentPage: React.FC<ContentPageProps> = ({
  children,
  documentTitle = "CREATOR DNA",
}) => (
  <Page size="A4" style={commonStyles.page}>
    {children}
    <Footer documentTitle={documentTitle} />
  </Page>
);

// Transformation Table Component
interface TransformationItem {
  before: string;
  after: string;
}

interface TransformationTableProps {
  items: TransformationItem[];
}

export const TransformationTable: React.FC<TransformationTableProps> = ({
  items,
}) => {
  const styles = StyleSheet.create({
    container: {
      marginVertical: 15,
    },
    row: {
      flexDirection: "row",
      marginBottom: 8,
      alignItems: "center",
    },
    beforeBox: {
      flex: 1,
      backgroundColor: "#fee2e2",
      padding: 10,
      borderRadius: 4,
    },
    arrow: {
      width: 40,
      textAlign: "center",
      fontSize: 16,
      color: colors.accentGold,
    },
    afterBox: {
      flex: 1,
      backgroundColor: "#dcfce7",
      padding: 10,
      borderRadius: 4,
    },
    text: {
      fontSize: 9,
      color: colors.darkGray,
    },
  });

  return (
    <View style={styles.container}>
      {items.map((item, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.beforeBox}>
            <Text style={styles.text}>{item.before}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.afterBox}>
            <Text style={styles.text}>{item.after}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// Pricing Table Component
interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface PricingTableProps {
  tiers: PricingTier[];
}

export const PricingTable: React.FC<PricingTableProps> = ({ tiers }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginVertical: 15,
    },
    tier: {
      flex: 1,
      marginHorizontal: 5,
      borderWidth: 1,
      borderColor: "#eee",
      borderRadius: 6,
      overflow: "hidden",
    },
    tierRecommended: {
      borderColor: colors.accentGold,
      borderWidth: 2,
    },
    tierHeader: {
      backgroundColor: colors.lightGray,
      padding: 12,
      alignItems: "center",
    },
    tierHeaderRecommended: {
      backgroundColor: colors.accentGold,
    },
    tierName: {
      fontSize: 11,
      fontWeight: 700,
      color: colors.primary,
    },
    tierNameRecommended: {
      color: colors.primary,
    },
    tierPrice: {
      fontSize: 18,
      fontWeight: 700,
      color: colors.accentGold,
      marginTop: 5,
    },
    tierPriceRecommended: {
      color: colors.primary,
    },
    tierBody: {
      padding: 12,
    },
    tierFeature: {
      flexDirection: "row",
      marginBottom: 4,
    },
    tierFeatureCheck: {
      width: 15,
      fontSize: 9,
      color: "#22c55e",
    },
    tierFeatureText: {
      flex: 1,
      fontSize: 8,
      color: colors.darkGray,
    },
    recommendedBadge: {
      position: "absolute",
      top: -1,
      right: -1,
      backgroundColor: colors.accentRed,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderBottomLeftRadius: 4,
    },
    recommendedText: {
      fontSize: 7,
      color: colors.white,
      fontWeight: 700,
    },
  });

  return (
    <View style={styles.container}>
      {tiers.map((tier, i) => (
        <View
          key={i}
          style={tier.recommended ? [styles.tier, styles.tierRecommended] : styles.tier}
        >
          {tier.recommended && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>RECOMMENDED</Text>
            </View>
          )}
          <View
            style={tier.recommended ? [styles.tierHeader, styles.tierHeaderRecommended] : styles.tierHeader}
          >
            <Text
              style={tier.recommended ? [styles.tierName, styles.tierNameRecommended] : styles.tierName}
            >
              {tier.name}
            </Text>
            <Text
              style={tier.recommended ? [styles.tierPrice, styles.tierPriceRecommended] : styles.tierPrice}
            >
              {tier.price}
            </Text>
          </View>
          <View style={styles.tierBody}>
            {tier.features.map((feature, j) => (
              <View key={j} style={styles.tierFeature}>
                <Text style={styles.tierFeatureCheck}>✓</Text>
                <Text style={styles.tierFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};
