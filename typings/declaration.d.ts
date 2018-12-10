declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare var If: React.SFC<{ condition: boolean }>;
declare var For: React.SFC<{ each: string; index: string; of: [] }>;
declare var Choose: React.SFC;
declare var When: React.SFC<{ condition: boolean }>;
declare var Otherwise: React.SFC;
