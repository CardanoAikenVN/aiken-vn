// Translations for Landing Page Components

export interface Translations {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    startLearning: string;
    downloadPdf: string;
    codeComment: string;
    explanationTitle: string;
    explanationText: string;
    seeExplanation: string;
  };
  features: {
    title1: string;
    description1: string;
    badge1: string;
    title2: string;
    description2: string;
    title3: string;
    description3: string;
    title4: string;
    description4: string;
    badge4: string;
  };
  curriculum: {
    sectionTitle: string;
    sectionDescription: string;
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
    step4Title: string;
    step4Description: string;
    step5Title: string;
    step5Description: string;
  };
  projects: {
    sectionTitle: string;
    sectionDescription: string;
    viewGithub: string;
    project1Title: string;
    project1Description: string;
    project2Title: string;
    project2Description: string;
    project3Title: string;
    project3Description: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };
  community: {
    sectionTitle: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    trustedBy: string;
  };
  footer: {
    documentation: string;
    license: string;
    privacy: string;
    copyright: string;
  };
}

const translations: Record<string, Translations> = {
  vi: {
    hero: {
      badge: "Đã ra mắt v1.0",
      title: "Học Aiken bằng",
      subtitle: "Tiếng Việt.",
      description: "Giáo trình tiếng Việt mã nguồn mở đầu tiên giúp lập trình viên làm chủ Aiken và smart contract trên Cardano. Nhanh. Rõ ràng. Miễn phí.",
      startLearning: "Bắt đầu học",
      downloadPdf: "Tải PDF",
      codeComment: "// Một Validator Aiken đơn giản",
      explanationTitle: "Giải thích (Explanation)",
      explanationText: "Đây là một validator cơ bản nhất. Hàm check luôn trả về true, nghĩa là mọi giao dịch gửi đến địa chỉ này đều được chấp nhận mà không cần điều kiện gì.",
      seeExplanation: "Xem giải thích tiếng Việt",
    },
    features: {
      title1: "Dành cho người mới",
      description1: "Giáo trình từng bước được thiết kế riêng cho lập trình viên Việt Nam mới làm quen với mô hình UTXO.",
      badge1: "Ưu tiên VN",
      title2: "Dự án thực tế",
      description2: "Vượt qua lý thuyết. Xây dựng các công cụ tạo token, hợp đồng ký quỹ và lịch trình vesting thực tế.",
      title3: "Kiểm thử đầy đủ",
      description3: "Mỗi bài học đều đi kèm với các unit test toàn diện được viết bằng framework kiểm thử gốc của Aiken.",
      title4: "Mã nguồn mở 100%",
      description4: "Được cấp phép theo CC BY-4.0. Được xây dựng bởi cộng đồng, vì cộng đồng.",
      badge4: "Miễn phí",
    },
    curriculum: {
      sectionTitle: "Lộ trình học tập",
      sectionDescription: "Từ con số 0 đến khi triển khai smart contract trên Cardano.",
      step1Title: "The Aiken Foundation",
      step1Description: "Nền tảng Aiken - cú pháp và kiểu dữ liệu.",
      step2Title: "Cardano Architecture",
      step2Description: "Kiến trúc Cardano và mô hình eUTxO.",
      step3Title: "Your First Validator",
      step3Description: "Viết validator đầu tiên của bạn.",
      step4Title: "Minting Tokens & NFTs",
      step4Description: "Tạo native tokens và NFTs.",
      step5Title: "The Escrow Contract",
      step5Description: "Xây dựng hợp đồng escrow hoàn chỉnh.",
    },
    projects: {
      sectionTitle: "Bạn sẽ xây dựng được gì",
      sectionDescription: "Ứng dụng thực tế, không chỉ là lý thuyết.",
      viewGithub: "Xem GitHub Repo",
      project1Title: "Công cụ tạo Token tùy chỉnh",
      project1Description: "Học cách triển khai chính sách tiền tệ để đúc và đốt tài sản gốc trên Cardano. Kiểm soát nguồn cung và logic phân phối.",
      project2Title: "Ký quỹ Vesting",
      project2Description: "Bảo vệ tài sản trong hợp đồng chỉ giải ngân sau một thời hạn cụ thể.",
      project3Title: "Validator cho Sàn giao dịch",
      project3Description: "Logic để tạo điều kiện giao dịch tài sản không cần tin cậy giữa người dùng.",
      ctaTitle: "Sẵn sàng để viết code?",
      ctaDescription: "Bắt đầu bài học đầu tiên ngay.",
      ctaButton: "Bắt đầu ngay",
    },
    community: {
      sectionTitle: "Xóa bỏ rào cản ngôn ngữ",
      stat1Value: "17%",
      stat1Label: "người trưởng thành Việt Nam sở hữu crypto",
      stat2Value: "95%",
      stat2Label: "tài liệu học tập là tiếng Anh",
      stat3Value: "100%",
      stat3Label: "Mã nguồn mở & Hướng tới cộng đồng",
      trustedBy: "Được tin tưởng bởi Cộng đồng Cardano Builder Việt Nam",
    },
    footer: {
      documentation: "Tài liệu",
      license: "Giấy phép (CC BY-4.0)",
      privacy: "Quyền riêng tư",
      copyright: "Aiken VN. Xây dựng cho hệ sinh thái.",
    },
  },
};

export function useTranslations(locale: string = 'vi'): Translations {
  return translations[locale] || translations['vi'];
}

export default translations;
