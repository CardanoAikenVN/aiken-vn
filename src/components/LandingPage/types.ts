export interface Quest {
  id: string;
  number: number;
  title: string;
  description: string;
  imageAlt: string;
  colorTheme: string;
  illustrationType: 'token' | 'staking' | 'vendor' | 'lending' | 'stable' | 'wallet' | 'nft';
}

export interface NavLink {
  label: string;
  href: string;
}
