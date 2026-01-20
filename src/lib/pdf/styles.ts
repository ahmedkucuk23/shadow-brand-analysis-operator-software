import { StyleSheet, Font } from "@react-pdf/renderer";

// Register fonts for better typography
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2", fontWeight: 700 },
  ],
});

// Color palette matching the example PDFs
export const colors = {
  primary: "#0a0a0a",
  primaryDark: "#050505",
  accentGold: "#c9a227",
  accentRed: "#e94560",
  white: "#ffffff",
  lightGray: "#f5f5f5",
  mediumGray: "#888888",
  darkGray: "#333333",
  tableHeader: "#1a1a1a",
  tableRow: "#f8f8f8",
  tableRowAlt: "#ffffff",
  highlightBg: "#fff9e6",
  quoteBg: "#f0f0f0",
};

// Common styles for PDF documents
export const commonStyles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 50,
    fontFamily: "Inter",
    fontSize: 10,
    color: colors.primary,
  },
  coverPage: {
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  coverBadge: {
    backgroundColor: colors.accentGold,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 30,
  },
  coverBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2,
  },
  coverTitle: {
    color: colors.white,
    fontSize: 36,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 10,
  },
  coverSubtitle: {
    color: colors.accentGold,
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 40,
  },
  coverDivider: {
    width: 100,
    height: 2,
    backgroundColor: colors.accentGold,
    marginVertical: 30,
  },
  coverMeta: {
    color: colors.mediumGray,
    fontSize: 10,
    textAlign: "center",
  },

  // Section headers
  sectionNumber: {
    color: colors.accentGold,
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: 5,
  },
  sectionUnderline: {
    width: 60,
    height: 3,
    backgroundColor: colors.accentGold,
    marginBottom: 20,
  },

  // Content styles
  heading1: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.primary,
    marginTop: 15,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.primary,
    marginTop: 10,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 10,
    color: colors.darkGray,
  },

  // Lists
  bulletList: {
    marginLeft: 15,
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletPoint: {
    width: 15,
    fontSize: 10,
    color: colors.accentGold,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: colors.darkGray,
  },

  // Checkmarks
  checkItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  checkMark: {
    width: 18,
    fontSize: 10,
    color: "#22c55e",
  },
  crossMark: {
    width: 18,
    fontSize: 10,
    color: colors.accentRed,
  },
  checkText: {
    flex: 1,
    fontSize: 10,
    color: colors.darkGray,
  },

  // Tables
  table: {
    marginVertical: 15,
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.tableHeader,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  tableHeaderCell: {
    color: colors.white,
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableRowEven: {
    backgroundColor: colors.tableRow,
  },
  tableRowOdd: {
    backgroundColor: colors.tableRowAlt,
  },
  tableCell: {
    fontSize: 9,
    color: colors.darkGray,
  },

  // Boxes
  highlightBox: {
    backgroundColor: colors.highlightBg,
    borderLeftWidth: 4,
    borderLeftColor: colors.accentGold,
    padding: 15,
    marginVertical: 15,
    borderRadius: 4,
  },
  highlightText: {
    fontSize: 10,
    color: colors.darkGray,
    fontStyle: "italic",
  },
  quoteBox: {
    backgroundColor: colors.quoteBg,
    padding: 15,
    marginVertical: 15,
    borderRadius: 4,
  },
  quoteText: {
    fontSize: 11,
    color: colors.darkGray,
    fontStyle: "italic",
    textAlign: "center",
  },
  quoteAuthor: {
    fontSize: 9,
    color: colors.mediumGray,
    textAlign: "center",
    marginTop: 8,
  },

  // Cards
  card: {
    backgroundColor: colors.lightGray,
    padding: 15,
    marginVertical: 10,
    borderRadius: 6,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.primary,
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 10,
    color: colors.darkGray,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: colors.mediumGray,
  },
  pageNumber: {
    fontSize: 8,
    color: colors.mediumGray,
  },

  // Metrics
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  metricBox: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 6,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.accentGold,
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 8,
    color: colors.mediumGray,
    textTransform: "uppercase",
  },

  // Progress/Score
  scoreContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accentGold,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.primary,
  },
  scoreLabel: {
    fontSize: 10,
    color: colors.mediumGray,
    marginTop: 8,
  },

  // Day header for 14-day launch
  dayHeader: {
    backgroundColor: colors.primary,
    padding: 20,
    marginBottom: 20,
    borderRadius: 6,
  },
  dayNumber: {
    color: colors.accentGold,
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 5,
  },
  dayTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 700,
  },
  phaseTag: {
    backgroundColor: colors.accentRed,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  phaseTagText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
  },
});
